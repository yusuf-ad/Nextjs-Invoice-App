import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormatMoney } from "format-money-js";
import date from "date-and-time";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const fm = new FormatMoney({
  decimals: 2,
});

export function formatMoney(money: number): number {
  return fm.from(+money, { symbol: "$" }, true)?.fullAmount;
}

export function formatDate(newDate: Date) {
  return date.format(newDate, "D MMM YYYY");
}

export function generateInvoiceId() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 6);

  return nanoid().toUpperCase();
}
