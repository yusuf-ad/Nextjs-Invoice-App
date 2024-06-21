import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function InvoiceInput({ form, name, label }) {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <div className="flex justify-between">
            <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
              {label}
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
  );
}

export default InvoiceInput;
