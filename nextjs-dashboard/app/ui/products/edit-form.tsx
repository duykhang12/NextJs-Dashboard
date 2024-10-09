"use client";

import { ProductForm } from "@/app/lib/definitions";
import {
  CheckIcon,
  XMarkIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  CubeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateProduct, ProductFormState } from "@/app/lib/actions";
import { useActionState } from "react";

export default function EditProductForm({ product }: { product: ProductForm }) {
  const initialState: ProductFormState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, formAction] = useActionState(updateProductWithId, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter a name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={product.name}
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
              />
              <DocumentDuplicateIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="product-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Enter a price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="product-error" aria-live="polite" aria-atomic="true">
              {state.errors?.price &&
                state.errors.price.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Enter a number of product
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="stock"
                name="stock"
                type="number"
                step="0.01"
                defaultValue={product.stock}
                placeholder="Enter a amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
              />
              <CubeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="product-error" aria-live="polite" aria-atomic="true">
              {state.errors?.stock &&
                state.errors.stock.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Product Status */}
        <fieldset className="mb-4">
          <legend className="mb-2 block text-sm font-medium">
            Set the product status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="inactive"
                  name="status"
                  type="radio"
                  value="inactive"
                  defaultChecked={product.status === 'inactive'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="inactive"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  <XMarkIcon className="h-4 w-4" /> Inactive
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="active"
                  name="status"
                  type="radio"
                  value="active"
                  defaultChecked={product.status === 'active'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="active"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  <CheckIcon className="h-4 w-4" /> Active
                </label>
              </div>
            </div>
            <div id="product-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </fieldset>

        {/* Product Image */}
        <div className="mb-4">
          <label
            htmlFor="productImage"
            className="mb-2 block text-sm font-medium"
          >
            Upload a product image
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="productImage"
                name="productImage"
                type="file"
                className="block w-full text-sm text-gray-600 file:me-4 file:py-2 file:px-4 file:rounded-lg file:bg-gray-300 file:border-0 file:text-sm file:font-semibold file:text-black hover:file:bg-gray-400 file:disabled:opacity-50 file:disabled:pointer-events-none"
                // required
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-300"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Product</Button>
      </div>
    </form>
  );
}
