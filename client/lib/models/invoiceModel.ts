import mongoose from "mongoose";

const { Schema } = mongoose;

const addressSchema = new Schema(
  {
    street: String,
    city: String,
    postCode: String,
    country: String,
  },
  { _id: false },
);

const invoiceSchema = new Schema(
  {
    invoiceId: String,
    description: {
      type: String,
      default: "Invoice description",
    },
    status: {
      type: String,
      default: "pending",
      lowercase: true,
    },
    paymentDue: {
      type: String,
    },
    paymentTerms: String,
    total: {
      type: Number,
      default: 0,
    },
    items: {
      type: [Object],
      default: [],
    },
    senderAddress: {
      type: addressSchema,
    },
    clientName: {
      type: String,
    },
    clientEmail: {
      type: String,
    },
    clientAddress: {
      type: addressSchema,
    },
  },
  { timestamps: true },
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);

export default Invoice;
