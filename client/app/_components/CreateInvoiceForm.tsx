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

const invoiceSchema = z.object({
  clientName: z.string({ message: "Can't be empty" }).min(2).max(30),
  clientEmail: z.string({ message: "Can't be empty" }).email(),
});

function CreateInvoiceForm() {
  const form = useForm<z.output<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
  });

  return (
    <Form {...form}>
      <form>
        <h3 className="mt-8 text-sm font-bold capitalize text-skin-purple">
          Bill to
        </h3>

        <FormField
          name="clientName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium capitalize text-skin-baliHai">
                Client&lsquo;s Name
              </FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default CreateInvoiceForm;
