// components/carousel.tsx

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "lib/utils";
import Stripe from "stripe"; // Keep this import for Stripe's types

// --- THE FINAL FIX: Remove your custom 'Product' interface and use Stripe.Product directly ---
// interface Product {
//   id: string;
//   name: string;
//   description: string | null;
//   images?: string[];
//   default_price: Stripe.Price | null | undefined;
// }

// Define the component props type to directly use Stripe.Product
interface CarouselProps {
  products: Stripe.Product[]; // <-- **THIS IS THE CRITICAL CHANGE**
}

export function Carousel({ products }: CarouselProps) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-extrabold text-neutral-900 tracking-tight">
        Featured Products
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          // Now 'product' is of type Stripe.Product.
          // 'product.default_price' is of type 'string | Stripe.Price | null | undefined'.

          // We need to ensure 'price' is actually a Stripe.Price object before accessing unit_amount.
          // This type guard correctly handles string, null, and undefined cases.
          const price = product.default_price;
          const hasPriceData =
            typeof price === 'object' && // Ensure it's an object (i.e., Stripe.Price)
            price !== null &&          // Ensure it's not null
            typeof price.unit_amount === 'number'; // Ensure unit_amount exists and is a number

          return (
            <Link
              key={product.id} // product.id is always string
              href={`/products/${product.id}`}
              aria-label={`View details for ${product.name}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-blue-500"
            >
              <div className="relative aspect-square overflow-hidden rounded-xl bg-neutral-100 mb-4">
                {product.images && product.images.length > 0 && typeof product.images[0] === 'string' ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name || 'Product Image'} // product.name is string
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-neutral-200">
                    <svg width={48} height={48} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8M12 8v8" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-neutral-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="line-clamp-2 text-sm text-neutral-600">
                    {product.description || 'No description available.'}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  {hasPriceData ? (
                    <span className="text-lg font-bold text-indigo-700 bg-indigo-50 rounded-lg px-3 py-1 border border-indigo-100 shadow-sm">
                      {formatPrice(price.unit_amount, price.currency || 'USD')}
                    </span>
                  ) : (
                    <span className="text-base text-neutral-500">Price not available</span>
                  )}
                  <span className="ml-2 rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:from-indigo-700 hover:to-blue-700 hover:scale-105 active:scale-95 cursor-pointer">
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}