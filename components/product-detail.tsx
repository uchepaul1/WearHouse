"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "../store/cart-store";

interface Props {
  product: any;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const imageUrl =
    Array.isArray(product.images) &&
    typeof product.images[0] === "string" &&
    product.images[0].startsWith("http")
      ? product.images[0]
      : null;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: imageUrl,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 items-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl shadow-xl border border-blue-100">
      <div className="relative h-96 w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-gray-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            className="object-cover w-full h-full rounded-xl"
            fill
            unoptimized
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-300">
            <svg width={72} height={72} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <span className="mt-2 text-lg">No Image Available</span>
          </div>
        )}
      </div>
      {/* Rest of the component remains unchanged */}
      <div className="md:w-1/2 w-full flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
          {product.name}
        </h1>
        {product.description && (
          <p className="text-gray-700 text-lg mb-2 leading-relaxed">
            {product.description.length > 180
              ? product.description.slice(0, 180) + "..."
              : product.description}
          </p>
        )}
        {price && price.unit_amount && (
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-indigo-700">
              ${(price.unit_amount / 100).toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">USD</span>
          </div>
        )}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            aria-label="Remove one"
            onClick={() => removeItem(product.id)}
            className="w-10 h-10 rounded-full text-2xl border-indigo-300"
          >
            –
          </Button>
          <span className="text-lg font-semibold px-4 py-2 bg-indigo-50 rounded-lg border border-indigo-200 min-w-[40px] text-center">
            {quantity}
          </span>
          <Button
            aria-label="Add one"
            onClick={onAddItem}
            className="w-10 h-10 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-2xl shadow-lg transition"
          >
            +
          </Button>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button
            className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-lg text-lg shadow transition-all w-full sm:w-auto"
            aria-label="Add to cart"
            onClick={onAddItem}
          >
            Add to Cart
          </Button>
          <Button
            variant="outline"
            className="border-indigo-200 text-indigo-700 px-8 py-3 rounded-lg text-lg w-full sm:w-auto"
            aria-label="Buy now"
          >
            Buy Now
          </Button>
        </div>
        <div className="flex gap-2 mt-4">
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Fast Delivery
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            24/7 Support
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
            <svg width={16} height={16} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Money-back Guarantee
          </span>
        </div>
      </div>
    </div>
  );
};