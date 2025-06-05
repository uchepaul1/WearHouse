import { ProductDetail } from "../../../components/product-detail";
import { stripe } from "../../../lib/stripe";
import { Stripe } from "stripe";

// CHANGE #1: Changed the type to handle async params
type PageProps = {
  params: Promise<{ id: string }> | { id: string }
};

// CHANGE #2: Added a new function to handle the param retrieval
async function getProductId(params: PageProps['params']) {
  if (params instanceof Promise) {
    const resolvedParams = await params;
    return resolvedParams.id;
  }
  return params.id;
}

export default async function Page({ params }: PageProps) {
  // CHANGE #3: Use the new function to get the ID
  const productId = await getProductId(params);
  
  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product)) as Stripe.Product & {
    default_price: Stripe.Price;
  };

  return <ProductDetail product={plainProduct} />;
}