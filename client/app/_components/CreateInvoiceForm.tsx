"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Address from "./Address";
import PaymentTerms from "./PaymentTerms";
import ItemsList from "./ItemsList";
import PaymentDue from "./PaymentDue";

const addressSchema = z.object({
  street: z.string().min(1, "Street must not be empty"),
  city: z.string().min(1, "City must not be empty"),
  postCode: z.string().min(1, "Post code must not be empty"),
  country: z.string().min(1, "Country must not be empty"),
});

const invoiceSchema = z.object({
  clientName: z.string({ message: "Can't be empty" }).min(2).max(30),
  clientEmail: z.string({ message: "Can't be empty" }).email(),
  paymentDue: z.date(),
  paymentTerms: z.string(),
  description: z.string(),
  senderAddress: addressSchema,
  clientAddress: addressSchema,
});

function CreateInvoiceForm() {
  const form = useForm<z.output<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
  });

  function onSubmit(data: z.output<typeof invoiceSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Client&lsquo;s Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="clientEmail"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Client&lsquo;s Email
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
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
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Project Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ItemsList form={form} />
        </div>

        <div className="mt-10 flex items-center justify-between xs:mt-12">
          <button
            type="reset"
            className="btn-sm bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Discard
          </button>

          <div className="flex flex-col gap-4 xs:flex-row">
            <button
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