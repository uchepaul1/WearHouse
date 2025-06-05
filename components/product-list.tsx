"use client";

import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-10">
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-lg rounded-lg border border-gray-300 px-6 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
        />
      </div>
      {filteredProduct.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg width={64} height={64} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" className="mb-3 text-indigo-300">
            <circle cx="12" cy="12" r="10" />
            <path d="M9 9h.01M15 9h.01M8 13c1.333 1.333 4.667 1.333 6 0" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No products found</h2>
          <p className="text-gray-500">Try searching for something else!</p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProduct.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};