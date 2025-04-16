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
    description:
      "Experience Shopping Without Borders Enjoy the convenience of free shipping on all your orders.",
    icon: <TruckIcon className="h-6 w-6" />,
  },
  {
    title: "24/7 Customer Service",
    description:
      "Our dedicated customer service team is available around the clock to assist you with any questions.",
    icon: <HeadsetIcon className="h-6 w-6" />,
  },
  {
    title: "Secure Payment",
    description:
      "Shop with Confidence, Pay with Peace of Mind Your security is our top priority.",
    icon: <ShieldCheckIcon className="h-6 w-6" />,
  },
];

export default function CustomerAssurance() {
  return (
    <section className="bg-neutral-100">
      <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {aboutInfos.map((info) => (
            <div
              key={info.title}
              className="group flex flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center transition-shadow hover:shadow-lg sm:p-10"
            >
              <div className="rounded-full bg-neutral-100 p-4 transition-transform duration-300 group-hover:scale-110">
                {info.icon}
              </div>
              
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900 sm:text-xl">
                {info.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-neutral-600 sm:text-base">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}