// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Your existing formatPrice function
export function formatPrice(amount: number | null, currency: string = 'USD'): string {
  if (amount === null) {
    return 'N/A';
  }
  const effectiveCurrency = currency ? currency.toUpperCase() : 'USD';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: effectiveCurrency,
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

// --- FIX START ---
// Add the cn function here, as it needs to be exported from this file.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// --- FIX END ---