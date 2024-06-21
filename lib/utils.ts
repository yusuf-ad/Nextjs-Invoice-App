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

export function formatToFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === "object" && !(value instanceof Date)) {
      formData.append(key, JSON.stringify(value));
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else {
      formData.append(key, value);
    }
  });

  return formData;
}
