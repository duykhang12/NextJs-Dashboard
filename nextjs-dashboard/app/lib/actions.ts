"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import fs from "fs";
import path from "path";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  name: z.string()
    .min(1, { message: "Please enter a name." }),
  image_url: z.instanceof(File).refine((file) => file.size > 0, {
    message: "Please upload a file.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  price: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  stock: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than 0." }),
  status: z.enum(["pending", "paid", "active", "inactive"], {
    invalid_type_error: "Please select a status.",
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
  name: true,
  image_url: true,
  price: true,
  stock: true,
});
const UpdateInvoice = FormSchema.omit({
  id: true,
  date: true,
  name: true,
  image_url: true,
  price: true,
  stock: true,
});
const CreateProduct = FormSchema.omit({
  id: true,
  customerId: true,
  amount: true,
  date: true,
});
const UpdateProduct = FormSchema.omit({
  id: true,
  customerId: true,
  image_url:true,
  amount: true,
  date: true,
});

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
export type ProductState = {
  errors?: {
    name?: string[];
    image_url?: string[];
    price?: string[];
    stock?: string[];
    status?: string[];
  };
  message?: string | null;
};
export type ProductFormState = {
  errors?: {
    name?: string[];
    price?: string[];
    stock?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: InvoiceState,
  formData: FormData
) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
  // Test it out:
  //   console.log(rawFormData);
}

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function createProduct(
  prevState: ProductState,
  formData: FormData
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    image_url: formData.get("productImage"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { name, image_url, price, stock, status } = validatedFields.data;
  const priceInCents = price * 100;
  const date = new Date().toISOString();

  // Handle the image file
  let imagePath = null;

  if (image_url) {
    // Create a unique filename
    const uniqueFileName = `${name.replace(/\s+/g, "").toLowerCase()}.png`;

    // Define the upload directory
    const uploadDirectory = path.join(process.cwd(), "public/products");

    // Ensure the directory exists
    if (!fs.existsSync(uploadDirectory)) {
      fs.mkdirSync(uploadDirectory, { recursive: true });
    }

    // Define the full image path
    const fullImagePath = path.join(uploadDirectory, uniqueFileName);

    // Write the file to the disk
    const fileBuffer = Buffer.from(await image_url.arrayBuffer());
    fs.writeFileSync(fullImagePath, fileBuffer);

    // Save the image path
    imagePath = `/products/${uniqueFileName}`;
  }

  try {
    await sql`
    INSERT INTO products (name, image_url, price, stock, date, status)
    VALUES (${name}, ${imagePath}, ${priceInCents}, ${stock}, ${date}, ${status} )
`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(
  id: string,
  prevState: ProductFormState,
  formData: FormData
) {
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Product.",
    };
  }

  const { name, price, stock, status } = validatedFields.data;
  const priceInCents = price * 100;

  try {
    await sql`
        UPDATE products
        SET name = ${name}, price = ${priceInCents}, stock = ${stock}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Product." };
  }

  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(id: string) {
  // throw new Error('Failed to Delete Invoice');
  try {
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath("/dashboard/products");
    return { message: "Deleted Product." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Product." };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
