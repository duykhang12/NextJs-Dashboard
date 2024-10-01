// import { db } from "@vercel/postgres";
// import { products } from "../lib/placeholder-data";

// const client = await db.connect();

// async function seedProducts() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS products (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       image_url VARCHAR(500) NOT NULL,
//       price INT NOT NULL,
//       stock INT NOT NULL,
//       date DATE NOT NULL,
//       status VARCHAR(255) NOT NULL
//     );
//   `;
//   const insertedProducts = await Promise.all(
//     products.map(
//       (product) => client.sql`
//         INSERT INTO products ( name, image_url, price, stock, date, status )
//         VALUES ( ${product.name}, ${product.image_url}, ${product.price}, ${product.stock}, ${product.date}, ${product.status} )
//         ON CONFLICT (id) DO NOTHING;
//       `
//     )
//   );
//   return insertedProducts;
// }

// export async function GET() {    
//   try {
//     await client.sql`BEGIN`;
//     await seedProducts();
//     await client.sql`COMMIT`;
//     return Response.json({ message: "Database seeded successfully" });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     return Response.json({ error }, { status: 500 });
//   }
// }
