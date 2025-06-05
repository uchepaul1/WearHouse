"use client";

import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useCartStore } from "../../store/cart-store";
import { checkoutAction } from "./checkout-action";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Card className="max-w-md mx-auto p-8 flex flex-col items-center animate-fade-in">
          <ShoppingCartIcon className="w-16 h-16 text-blue-300 mb-4" />
          <h1 className="text-3xl font-bold mb-2 text-neutral-800">Your Cart is Empty</h1>
          <p className="text-neutral-500">Browse our products and add something you love!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-2 animate-fade-in">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700 tracking-tight drop-shadow-lg">
        Checkout
      </h1>
      <Card className="max-w-lg mx-auto mb-8 shadow-lg rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-blue-100 animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCartIcon className="w-6 h-6 text-blue-400" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 border-b pb-4 items-center group hover:bg-blue-50 transition"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover shadow-sm border"
                  />
                )}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-blue-900">{item.name}</span>
                    <span className="font-bold text-green-600">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove one"
                      className="rounded-full border-blue-200 hover:bg-blue-100"
                    >
                      –
                    </Button>
                    <span className="text-lg font-semibold px-2">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                      aria-label="Add one"
                      className="rounded-full border-blue-200 hover:bg-blue-100"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center border-t pt-4 text-xl font-bold">
            <span className="text-neutral-700">Total:</span>
            <span className="text-green-700">${(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className="max-w-lg mx-auto animate-fade-in-up">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          variant="default"
          className="w-full py-3 rounded-xl text-lg bg-gradient-to-r from-blue-700 to-green-500 hover:from-blue-800 hover:to-green-600 transition-all shadow-lg font-bold tracking-wide"
        >
          Proceed to Payment
        </Button>
      </form>
    </div>
  );
}