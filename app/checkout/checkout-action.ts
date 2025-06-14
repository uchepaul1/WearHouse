"use server";

import { stripe } from "../../lib/stripe";
import { CartItem } from "../../store/cart-store";
import { redirect } from "next/navigation";

export const checkoutAction = async (formData: FormData): Promise<void> => {
  const itemsJson = formData.get("items") as string;
  const items = JSON.parse(itemsJson);

  const line_items = items.map((item: CartItem) => ({
    price_data: {
      currency: "usd",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const baseUrl = process.env.NODE_ENV === 'production'
    ? process.env.URL
    : 'http://localhost:3000';

  if (!baseUrl) {
    console.error("Base URL environment variable (process.env.URL) is not set.");
    throw new Error("Missing base URL configuration for checkout.");
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${baseUrl}/success`, 
    cancel_url: `${baseUrl}/checkout`,  
  });

  redirect(session.url!);
};