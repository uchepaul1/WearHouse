import React, { JSX } from "react";
import { HeadsetIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";

type AboutInfoType = {
  title: string;
  description: string;
  icon: JSX.Element;
};

const aboutInfos: AboutInfoType[] = [
  {
    title: "Free Shipping",
    description: "Free shipping on all orders. Shop from anywhere, anytime.",
    icon: <TruckIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "24/7 Support",
    description: "We're here around the clock to help with any questions.",
    icon: <HeadsetIcon className="h-6 w-6 text-indigo-600" />,
  },
  {
    title: "Secure Payment",
    description: "Checkout securely and shop with confidence.",
    icon: <ShieldCheckIcon className="h-6 w-6 text-indigo-600" />,
  },
];

export default function CustomerAssurance() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-14">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-80px] top-[-80px] h-48 w-48 rounded-full bg-indigo-200 opacity-20 blur-2xl" />
        <div className="absolute right-[-90px] bottom-[-60px] h-56 w-56 rounded-full bg-blue-200 opacity-20 blur-2xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4">
        <h2 className="mb-10 text-center text-[1.7rem] font-extrabold tracking-tight text-indigo-800">
          Our Commitment to You
        </h2>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {aboutInfos.map((info) => (
            <div
              key={info.title}
              className="group relative flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow transition-all duration-200 border-t-4 border-indigo-100 hover:shadow-lg hover:-translate-y-1 focus-within:shadow-lg"
              tabIndex={0}
              aria-label={info.title}
            >
              <div className="relative flex items-center justify-center mb-1">
                <span className="absolute -inset-1 rounded-full bg-indigo-100 opacity-50 blur group-hover:scale-105 transition-transform" />
                <span className="relative z-10 rounded-full bg-white p-4 border border-indigo-100 shadow-sm transition-transform duration-200 group-hover:scale-105">
                  {info.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold tracking-tight text-indigo-800">
                {info.title}
              </h3>
              <div className="mx-auto mt-1 h-1 w-10 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 opacity-90" />
              <p className="mt-2 text-base leading-relaxed text-neutral-600">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}