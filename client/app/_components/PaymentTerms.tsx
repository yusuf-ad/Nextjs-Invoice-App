import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function PaymentTerms({ form }) {
  return (
    <FormField
      control={form.control}
      name="paymentTerms"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
            Payment Terms
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={"Net 7 Days"}>
            <FormControl>
              <SelectTrigger className="h-12 px-4 font-bold dark:bg-skin-mirage">
                <SelectValue placeholder="Net 7 Days" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem className="h-10" value="Net 1 Day">
                Net 1 Day
              </SelectItem>
              <SelectItem className="h-10" value="Net 7 Days">
                Net 7 Days
              </SelectItem>
              <SelectItem className="h-10" value="Net 14 Days">
                Net 14 Days
              </SelectItem>
              <SelectItem className="h-10" value="Net 30 Days">
                Net 30 Days
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default PaymentTerms;
