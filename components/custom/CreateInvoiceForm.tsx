"use client";

import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Address from "./Address";
import PaymentDue from "./PaymentDue";
import PaymentTerms from "./PaymentTerms";
import ItemsList from "./ItemsList";
import InvoiceInput from "./InvoiceInput";
import { createDraftInvoice, createInvoice } from "@/server/actions";
import { InvoiceSchema } from "@/lib/definitions/invoice";
import { Form } from "@/components/ui/form";
import { useModal } from "./Modal";

const initialValues = {
  clientName: "",
  clientEmail: "",
  paymentDue: new Date(),
  paymentTerms: "Net 7 Days",
  description: "",
  senderAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  clientAddress: {
    street: "",
    city: "",
    postCode: "",
    country: "",
  },
  items: [
    {
      qty: 1,
      price: 0,
      totalPrice: 0,
      id: nanoid(4),
    },
  ],
};

function CreateInvoiceForm() {
  const form = useForm<z.output<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      ...initialValues,
      status: "pending",
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  const { close: closeModal } = useModal();

  async function onSubmit(data: z.output<typeof InvoiceSchema>) {
    const { status, message } = (await createInvoice(data)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      return toast.error(message);
    }

    closeModal();

    toast.success("Invoice created successfully.");
  }

  async function handleDraftInvoice() {
    const data = form.getValues();

    const { status, message } = (await createDraftInvoice(data)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      return toast.error(message);
    }

    closeModal();

    toast.success("Invoice saved as draft.");
  }

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <h3 className="mb-4 mt-8 text-sm font-bold capitalize text-skin-purple">
            Bill from
          </h3>

          <Address control={form.control} address={"clientAddress"} />

          <h3 className="mb-4 mt-8 text-sm font-bold capitalize text-skin-purple">
            Bill to
          </h3>

          <InvoiceInput
            control={form.control}
            name="clientName"
            label="Client's Name"
          />

          <InvoiceInput
            control={form.control}
            name="clientEmail"
            label="Client's Email"
          />

          <Address control={form.control} address={"senderAddress"} />

          <PaymentDue control={form.control} />

          <PaymentTerms form={form} />

          <InvoiceInput
            control={form.control}
            name="description"
            label="Project Description"
          />

          <ItemsList
            fields={fields}
            append={append}
            remove={remove}
            form={form}
          />
        </div>

        <div className="mt-10 flex items-center justify-between xs:mt-12">
          <button
            onClick={closeModal}
            type="button"
            className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Discard
          </button>

          <div className="flex flex-col gap-4 xs:flex-row">
            <button
              onClick={handleDraftInvoice}
              type="button"
              className="btn-sm order-2 bg-skin-gray font-bold text-skin-baliHai hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="btn-sm order-1 bg-skin-purple text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-90 xs:order-4"
            >
              {form.formState.isSubmitting ? "Creating..." : "Save & Send"}
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CreateInvoiceForm;
