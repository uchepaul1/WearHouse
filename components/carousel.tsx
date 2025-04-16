import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export function Carousel({ products }) {
  return (
    <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold text-neutral-900 sm:text-3xl">
        Featured Products
      </h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group overflow-hidden rounded-lg border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-lg"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <Image
                src={product.images[0]}
                alt={product.name}
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium text-neutral-900 line-clamp-1">
                {product.name}
              </h3>
              
              <p className="line-clamp-2 text-sm text-neutral-600">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-neutral-900">
                  {formatPrice(product.default_price.unit_amount)}
                </span>
                
                <span className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
                  View Details
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}