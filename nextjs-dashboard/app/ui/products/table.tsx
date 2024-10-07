import Image from "next/image";
import { UpdateProduct, DeleteProduct } from "@/app/ui/products/button";
import ProductStatus from "@/app/ui/products/status";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { fetchFilteredProducts } from "@/app/lib/data";

export default async function ProductsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {products?.map((product) => (
              <div
                key={product.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={`data:image/png;base64,${product.image_data}`}
                        className="mr-2"
                        width={50}
                        height={50}
                        alt={`${product.name}'s profile picture`}
                      />
                      <p>{product.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{product.stock}</p>
                  </div>
                  <ProductStatus status={product.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(product.price)}
                    </p>
                    <p>{formatDateToLocal(product.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProduct id={product.id} />
                    <DeleteProduct id={product.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-lg font-bold">
              <tr>
                <th
                  scope="col"
                  className="px-4 py-5 sm:pl-6 border border-gray-300"
                >
                  Product Name
                </th>
                <th scope="col" className="px-3 py-5 border border-gray-300">
                  Price
                </th>
                <th scope="col" className="px-3 py-5 border border-gray-300">
                  Stock
                </th>
                <th scope="col" className="px-3 py-5 border border-gray-300">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 border border-gray-300">
                  Status
                </th>
                <th
                  scope="col"
                  className="py-3 pl-6 pr-3 border border-gray-300"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {products?.map((product) => (
                <tr
                  key={product.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-9 pr-1 border border-gray-300">
                    <div className="flex items-center gap-10">
                      <Image
                        src={`data:image/png;base64,${product.image_data}`}
                        width={50}
                        height={50}
                        alt={`${product.name}'s profile picture`}
                      />
                      <p>{product.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 border border-gray-300">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 border border-gray-300">
                    {product.stock}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 border border-gray-300">
                    {formatDateToLocal(product.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 border border-gray-300">
                    <ProductStatus status={product.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3 border border-gray-300">
                    <div className="flex gap-3">
                      <UpdateProduct id={product.id} />
                      <DeleteProduct id={product.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
