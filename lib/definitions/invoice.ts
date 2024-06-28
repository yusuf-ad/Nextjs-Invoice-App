import { z } from "zod";

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

export type InvoiceType = {
  clientName: string;
  clientEmail: string;
  paymentDue: Date;
  paymentTerms: string;
  description: string;
  total: number;
  senderAddress: Address;
  clientAddress: Address;
  status: "paid" | "pending" | "draft";
  invoiceId: string;
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
