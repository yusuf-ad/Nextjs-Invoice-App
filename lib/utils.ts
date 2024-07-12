import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import date from "date-and-time";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(newDate: Date) {
  return date.format(newDate, "D MMM YYYY");
}

export function generateInvoiceId() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 6);

  return nanoid().toUpperCase();
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
