import { JsonValue } from "@prisma/client/runtime/library";
import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  password: z
    .string({ message: "Can't be empty." })
    .min(4)
    .max(24)
    .trim()
    .refine((value) => !value.includes(" "), {
      message: "Password cannot contain spaces.",
    }),
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  email: z.string({ message: "Can't be empty." }).email().trim(),
});

export const LoginFormSchema = z.object({
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  password: z
    .string({ message: "Can't be empty." })
    .min(4)
    .max(24)
    .trim()
    .refine((value) => !value.includes(" "), {
      message: "Password cannot contain spaces.",
    }),
});

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export type Invoice = {
  description: string;
  paymentDue: string;
  paymentTerms: string;
  clientName: string;
  clientEmail: string;
  total: number;
  clientAddress: Address;
  senderAddress: Address;
  invoiceId: string;
  status: "paid" | "pending" | "draft";
  items: Item[];
};

export type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type Item = {
  name: string;
  qty: number;
  price: number;
  totalPrice: number;
  id: string;
};
