import { ProductDetail } from "../../../components/product-detail";
import { stripe } from "../../../lib/stripe";
import { Stripe } from "stripe";

// FIXED: Updated type to match Next.js 15 expectations
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id: productId } = await params;
  
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product)) as Stripe.Product & {
    default_price: Stripe.Price;
  };

  return <ProductDetail product={plainProduct} />;
}