"use client";

import Link from "next/link";
import Image from "next/image";
// import { ReviewType } from "./Review";
// import useWishlistContext from "../hooks/useWishlistContext";
// import useUserContext from "../hooks/useUserContext";
// import { StoreType } from "./AdminPageLayout";
import { useState } from "react";
import { HeartIcon, StarIcon } from "lucide-react";

export type ProductType = {
  _id: string;
  name: string;
  description: string;
  shipping: number;
  discount: number;
  isPublished: boolean;
  quantity: number;
  price: number;
  gender: string;
  colors: string[];
  categories: string[];
  sizes: string[];
  images: string[];
  reviews: ReviewType[];
  rating: number;
  createdAt: string;
  store: StoreType;
};

export default function Product({
  product,
  fixedWidth = false,
}: {
  product: ProductType;
  fixedWidth?: boolean;
}) {
  const { user } = useUserContext();
  const { wishlist, addProductToWishlist, removeProductFromWishlist } =
    useWishlistContext();

  const productInWishlist =
    wishlist.find((wishlistItem) => wishlistItem.productId === product._id) ||
    null;

  const [imageLoaded, setImageLoaded] = useState(false);

  const productSlug = (product._id + " " + product.name)
    .toLowerCase()
    .split(" ")
    .join("-");

  async function toggleAddToWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (productInWishlist)
      return removeProductFromWishlist(productInWishlist._id);
    const wishlistProduct = {
      _id: "1",
      productId: product._id,
      name: product.name,
      imgUrl: product.images[0],
      colors: product.colors,
      sizes: product.sizes,
      price: product.price,
      storeId: product.store._id,
      shipping: 12.99,
      quantity: 1,
    };

    addProductToWishlist(wishlistProduct);
  }

  return (
    <div className="flex flex-col gap-1 rounded-md">
      <div
        className={`relative aspect-[0.9] overflow-hidden rounded-md bg-zinc-100 ${
          imageLoaded ? "" : "animate-pulse bg-zinc-300"
        } ${fixedWidth ? "w-48 sm:w-60" : "w-full"}`}
      >
        <Image
          onLoadingComplete={() => setImageLoaded(true)}
          src={product.images[0]}
          alt={product.name}
          fill
          className={`absolute left-0 top-0 object-contain duration-300 ${
            imageLoaded ? "visible" : "invisible"
          }`}
        />
        {user && (
          <button
            className="absolute right-2 top-2 rounded-full bg-white p-1 shadow-sm"
            onClick={toggleAddToWishlist}
          >
            <HeartIcon
              className={`h-4 w-4 stroke-accent-blue-100 ${
                productInWishlist
                  ? "fill-accent-blue-100"
                  : "fill-white"
              }`}
            />
          </button>
        )}
      </div>
      <div className="flex items-center justify-between">
        <Link
          href={`/store/${product.store._id}-${product.store.name}`}
          className="text-sm text-zinc-500 hover:underline focus-visible:underline"
        >
          {product.store.name}
        </Link>
        <p className="flex items-center gap-1 font-medium">
          <StarIcon className="h-4 w-4 stroke-none" fill="#EFBF04" />
          {product.rating.toFixed(1)}
        </p>
      </div>
      <Link
        href={`/products/${productSlug}`}
        className="line-clamp-1 font-medium hover:text-accent-blue-100 hover:underline focus-visible:text-accent-blue-100 focus-visible:underline"
      >
        {product.name}
      </Link>
      <div className="flex items-center justify-between">
        <p className="font-semibold">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}