"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import Address from "./Address";
import PaymentTerms from "./PaymentTerms";
import ItemsList from "./ItemsList";
import PaymentDue from "./PaymentDue";
import { nanoid } from "nanoid";
import { createDraftInvoice, createInvoice } from "@/lib/actions";
import { InvoiceSchema } from "@/lib/auth/definitions";
import toast from "react-hot-toast";

function CreateInvoiceForm({ closeModal }: { closeModal: () => void }) {
  const form = useForm<z.output<typeof InvoiceSchema>>({
    resolver: zodResolver(InvoiceSchema),
    defaultValues: {
      status: "pending",
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
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  });

  async function onSubmit(data: z.output<typeof InvoiceSchema>) {
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

    const { status, message } = (await createInvoice(formData)) ?? {
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

    const { status, message } = (await createDraftInvoice(formData)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      return toast.error(message);
    }

    closeModal();

    toast.success("Invoice saved as draft.");
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
          <FormField
            name="clientName"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                    Client&lsquo;s Name
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="clientEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                    Client&lsquo;s Email
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* address */}
          <Address form={form} address={"senderAddress"} />

          <PaymentDue form={form} />

          <PaymentTerms form={form} />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                    Project Description
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
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
              Save & Send
            </button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default CreateInvoiceForm;
