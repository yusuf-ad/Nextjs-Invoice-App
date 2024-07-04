import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

type InvoiceInputProps = {
  name: string;
  label: string;
  control: Control<any>;
};

function InvoiceInput({ name, label, control }: InvoiceInputProps) {
  return (
    <FormField
      name={name}
      control={control}
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
