import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="block h-full group transition-transform duration-300 hover:-translate-y-1"
      aria-label={`View details for ${product.name}`}
    >
      <Card className="group hover:shadow-xl transition duration-300 py-0 h-full flex flex-col border-gray-200 gap-0 bg-white rounded-2xl overflow-hidden">
        {product.images && product.images[0] ? (
          <div className="relative h-60 w-full bg-gray-50">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-105 group-hover:opacity-90 transition-transform duration-300 rounded-t-2xl"
              placeholder="blur"
              blurDataURL="/placeholder.png"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized // <--- disables Next.js image optimization for remote Stripe images
            />
          </div>
        ) : (
          <div className="relative h-60 w-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center rounded-t-2xl">
            <svg width={64} height={64} className="text-indigo-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
          </div>
        )}
        <CardHeader className="p-4 flex-1">
          <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          {price && price.unit_amount && (
            <p className="text-xl font-bold text-indigo-700 mb-2">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button
            className="mt-2 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-semibold py-2 rounded-lg w-full transition-all"
            aria-label="View product details"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};