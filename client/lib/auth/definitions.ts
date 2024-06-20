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

// Invoice client schema
const AddressSchema = z.object({
  street: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  postCode: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
});

const ItemSchema = z.object({
  name: z.string().min(1, "Required"),
  qty: z.coerce.number().min(1, "Invalid").max(1000),
  price: z.coerce.number().min(1, "Invalid").max(100000),
  id: z.string(),
  totalPrice: z.coerce.number().min(1, "Required"),
});

export const InvoiceSchema = z.object({
  clientName: z.string().min(2, "Required").max(30),
  clientEmail: z.string().email().min(1, "Required"),
  paymentDue: z.date(),
  paymentTerms: z.string(),
  description: z.string().min(1, "Required"),
  senderAddress: AddressSchema,
  clientAddress: AddressSchema,
  status: z.enum(["pending", "paid", "draft"]),
  items: z.array(ItemSchema).min(1, "At least one item is required!"),
});

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

export type Invoice = {
  description: string;
  paymentDue: Date;
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
