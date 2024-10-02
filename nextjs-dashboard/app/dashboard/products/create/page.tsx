import Form from "@/app/ui/products/create-form";
import Breadcrumbs from "@/app/ui/products/breadcrumbs";
// import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
};

export default async function Page() {
//   const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Products", href: "/dashboard/products" },
          {
            label: "Add Product",
            href: "/dashboard/products/create",
            active: true,
          },
        ]}
      />
      {/* <Form customers={customers} /> */}
      <Form />
    </main>
  );
}
