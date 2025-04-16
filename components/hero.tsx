"use client";

import Link from "next/link";
import Image from "next/image";
import male from "@/public/male.png";
import female from "@/public/female.png";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const heroDataList = [
  {
    title: "Style Reimagined: Men's Fashion",
    subTitle:
      "Elevate your wardrobe with our men's fashion collection. Discover the latest trends, timeless pieces, and versatile styles to keep you looking sharp.",
    image: male,
    href: "/products",
  },
  {
    title: "Chic & Elegant: Women's Fashion",
    subTitle:
      "Explore the newest trends, sophisticated outfits, and everyday essentials that reflect your personal style.",
    image: female,
    href: "/products",
  },
];

export default function Hero() {
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHeroIndex((prevIndex) =>
        prevIndex < heroDataList.length - 1 ? prevIndex + 1 : 0
      );
    }, 10000);

    return () => clearTimeout(timeout);
  }, [heroIndex]);

  return (
    <section className="relative overflow-hidden rounded-lg bg-neutral-100">
      <div className="mx-auto max-w-[1400px]">
        {heroDataList.map((heroData, index) => (
          <div
            key={index}
            className={`flex min-h-[600px] flex-col-reverse items-center justify-between transition-all duration-300 
              lg:min-h-[650px] lg:flex-row ${
                index === heroIndex
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0 absolute inset-0"
              }`}
          >
            {/* Text Content */}
            <div className="flex flex-1 flex-col items-center gap-6 px-6 text-center lg:items-start lg:px-12 lg:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl xl:text-6xl">
                {heroData.title}
              </h1>
              <p className="max-w-md text-base text-neutral-600 sm:text-lg lg:text-xl">
                {heroData.subTitle}
              </p>
              <Button
                asChild
                className="mt-2 rounded-full bg-black px-8 py-6 text-white transition-colors hover:bg-neutral-800"
              >
                <Link href={heroData.href}>Shop Now</Link>
              </Button>
            </div>

            {/* Image Container */}
            <div className="relative flex h-[400px] w-full flex-1 items-center justify-center lg:h-full lg:justify-end">
              {/* Circular Container */}
              <div className="relative h-[350px] w-[350px] overflow-hidden sm:h-[450px] sm:w-[450px] lg:h-[550px] lg:w-[550px]">
                {/* Background Circle */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200/80 to-neutral-100" />
                
                {/* Image with circular mask */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src={heroData.image}
                    alt={`${heroData.title} Image`}
                    fill
                    priority
                    className="object-cover scale-[1.15] hover:scale-[1.2] transition-transform duration-300"
                    sizes="(max-width: 640px) 350px, (max-width: 1024px) 450px, 550px"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}