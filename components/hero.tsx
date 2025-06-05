"use client";

import Link from "next/link";
import Image from "next/image";
import male from "public/male.png";
import female from "public/female.png";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      setHeroIndex((prev) => (prev < heroDataList.length - 1 ? prev + 1 : 0));
    }, 9000);
    return () => clearTimeout(timeout);
  }, [heroIndex]);

  const goTo = (idx: number) => setHeroIndex(idx);
  const prev = () => setHeroIndex((i) => (i === 0 ? heroDataList.length - 1 : i - 1));
  const next = () => setHeroIndex((i) => (i === heroDataList.length - 1 ? 0 : i + 1));

  return (
    <section className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden bg-neutral-100">
      <div className="pointer-events-none absolute -left-32 -top-24 h-80 w-80 rounded-full bg-indigo-200 opacity-30 blur-2xl z-0" />
      <div className="pointer-events-none absolute -right-44 bottom-0 h-[22rem] w-[22rem] rounded-full bg-blue-200 opacity-20 blur-2xl z-0" />

      <div className="relative z-10 flex w-full flex-col justify-center">
        <div className="relative w-full h-full min-h-[620px]">
          {heroDataList.map((heroData, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 flex w-full flex-col-reverse items-center justify-between transition-all duration-700 ease-in-out
                lg:flex-row
                ${index === heroIndex
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 pointer-events-none translate-x-8 lg:translate-x-24"
                }`}
              aria-hidden={index !== heroIndex}
              tabIndex={index === heroIndex ? 0 : -1}
              style={{ minHeight: "420px" }}
            >
              <div className="flex flex-1 flex-col items-center gap-6 px-6 text-center lg:items-start lg:px-24 lg:text-left justify-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                  <span className="bg-gradient-to-r from-indigo-600 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                    {heroData.title}
                  </span>
                </h1>
                <p className="max-w-md text-lg text-neutral-700 sm:text-xl">
                  {heroData.subTitle}
                </p>
                <Button
                  asChild
                  className="mt-2 rounded-full bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <Link href={heroData.href}>Shop Now</Link>
                </Button>
              </div>
              <div className="relative flex h-[280px] w-full flex-1 items-center justify-center lg:h-full lg:justify-end">
                <div className="relative h-[230px] w-[230px] overflow-hidden sm:h-[320px] sm:w-[320px] lg:h-[400px] lg:w-[400px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neutral-200/80 to-indigo-100 shadow-2xl" />
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <Image
                      src={heroData.image}
                      alt={`${heroData.title} Image`}
                      fill
                      priority={index === heroIndex}
                      className="object-cover scale-110 group-hover:scale-115 transition-transform duration-500"
                      sizes="(max-width: 640px) 230px, (max-width: 1024px) 320px, 400px"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute left-0 right-0 bottom-10 flex justify-center gap-6 z-20">
            <button
              aria-label="Previous Slide"
              onClick={prev}
              className="rounded-full bg-white/80 shadow p-2 hover:bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 transition"
            >
              <ChevronLeft className="h-6 w-6 text-indigo-600" />
            </button>
            <div className="flex gap-2">
              {heroDataList.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-3 w-3 rounded-full border transition-all duration-200
                    ${heroIndex === idx
                      ? "bg-gradient-to-r from-indigo-600 via-blue-500 to-pink-400 border-indigo-600 scale-125"
                      : "bg-neutral-300 border-neutral-400"
                    }`}
                  onClick={() => goTo(idx)}
                />
              ))}
            </div>
            <button
              aria-label="Next Slide"
              onClick={next}
              className="rounded-full bg-white/80 shadow p-2 hover:bg-white focus-visible:ring-2 focus-visible:ring-indigo-600 transition"
            >
              <ChevronRight className="h-6 w-6 text-indigo-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}