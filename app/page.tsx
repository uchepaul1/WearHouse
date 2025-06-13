// app/page.tsx

import { stripe } from "lib/stripe";
import { Carousel } from "components/carousel"; // <-- This should import your Carousel component
import CustomerAssurance from "components/customer-assurance";
import HeroWrapper from "components/hero-wrapper";
import NewsLetterSection from "components/newsletter";
import React from "react"; // Good practice to import React for JSX usage

function FullWidthSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] w-screen">
      {children}
    </div>
  );
}

// This is your actual page component that Next.js expects as a default export
export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 8,
  });

  return (
    <>
      <div className="mb-8 flex flex-1 flex-col gap-12">
        <HeroWrapper />
        <CustomerAssurance />
        <section className="py-12 bg-neutral-50">
          {/* Make sure products.data matches the Product[] type in components/carousel.tsx */}
          <Carousel products={products.data} />
        </section>
      </div>
      <FullWidthSection>
        <NewsLetterSection />
      </FullWidthSection>
    </>
  );
}