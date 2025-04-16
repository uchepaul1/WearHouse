import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Carousel } from "@/components/carousel";
import CustomerAssurance from "@/components/customer-assurance";
import HeroWrapper from "@/components/hero-wrapper";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    // Increased limit to show 8 products (2 rows of 4)
    limit: 8,
  });
  
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <HeroWrapper />

      {/* Customer Assurance Section */}
      <CustomerAssurance />
      
      {/* Products Section */}
      <section className="py-12 bg-neutral-50">
        <Carousel products={products.data} />
      </section>

      
    </div>
  );
}