import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
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

export function PaymentTerms({ form }: any) {
  function handleValueChange(value: string) {
    const paymentDays = parseInt(value.split(" ")[1], 10);
    const paymentDueDate = new Date(Date.now());
    paymentDueDate.setDate(paymentDueDate.getDate() + paymentDays);

    form.setValue("paymentDue", paymentDueDate);
    form.setValue("paymentTerms", value);
  }

  return (
    <FormField
      control={form.control}
      name="paymentTerms"
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between">
            <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
              Payment Terms
            </FormLabel>
            <FormMessage />
          </div>
          <Select onValueChange={handleValueChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-12 px-4 font-bold dark:bg-skin-mirage">
                <SelectValue placeholder="Net 7 Days" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {["Net 1 Day", "Net 7 Days", "Net 14 Days", "Net 30 Days"].map(
                (term) => (
                  <SelectItem key={term} className="h-10" value={term}>
                    {term}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}

export default PaymentTerms;
