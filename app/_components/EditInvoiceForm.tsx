"use client";

import toast from "react-hot-toast";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import Address from "./Address";
import PaymentDue from "./PaymentDue";
import PaymentTerms from "./PaymentTerms";
import ItemsList from "./ItemsList";
import InvoiceInput from "./InvoiceInput";
import { createInvoice } from "@/server/actions";
import { InvoiceSchema } from "@/lib/auth/definitions";
import { formatToFormData } from "@/lib/utils";

function EditInvoiceForm({ currentInvoice }) {
  const form = useForm<z.output<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: currentInvoice,
  });

  console.log(currentInvoice.paymentTerms);

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  async function onSubmit(data: z.output<typeof InvoiceSchema>) {
    const formData = formatToFormData(data);

    const { status, message } = (await createInvoice(formData)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      return toast.error(message);
    }

    // closeModal();

    toast.success("Invoice created successfully.");
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form {...form}>
      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="space-y-4">
          <h3 className="mb-4 mt-8 text-sm font-bold capitalize text-skin-purple">
            Bill from
          </h3>

          <Address form={form} address={"clientAddress"} />

          <h3 className="mb-4 mt-8 text-sm font-bold capitalize text-skin-purple">
            Bill to
          </h3>

          <InvoiceInput form={form} name="clientName" label="Client's Name" />

          <InvoiceInput form={form} name="clientEmail" label="Client's Email" />

          <Address form={form} address={"senderAddress"} />

          <PaymentDue form={form} />

          <PaymentTerms form={form} />

          <InvoiceInput
            form={form}
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

        <div className="mt-10 flex items-center justify-end xs:mt-12">
          <div className="flex flex-col gap-4 xs:flex-row">
            <button
              // onClick={closeModal}
              type="button"
              className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn-sm order-1 bg-skin-purple text-xs font-bold text-white disabled:cursor-not-allowed disabled:opacity-90 xs:order-4"
            >
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default EditInvoiceForm;
