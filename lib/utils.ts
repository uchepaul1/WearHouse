import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


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


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}