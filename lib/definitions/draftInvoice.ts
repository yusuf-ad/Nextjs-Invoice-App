import { z } from "zod";

const DraftAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  postCode: z.string(),
  country: z.string(),
});

const DraftItemSchema = z.object({
  name: z.string().optional(),
  qty: z.coerce.number().max(1000).optional(),
  price: z.coerce.number().max(100000).optional(),
  id: z.string().optional(),
  totalPrice: z.coerce.number().optional(),
});

export const DraftInvoiceSchema = z.object({
  clientName: z.string().max(30),
  clientEmail: z.string().max(30),
  paymentDue: z.date(),
  paymentTerms: z.string().max(30),
  description: z.string().max(30),
  senderAddress: DraftAddressSchema,
  clientAddress: DraftAddressSchema,
  status: z.enum(["pending"]),
  items: z.array(DraftItemSchema).min(0).max(10),
});
