"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function PaymentDue({ form }) {
  return (
    <FormField
      control={form.control}
      name="paymentDue"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <div className="flex justify-between">
            <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
              Invoice Date
            </FormLabel>
            <FormMessage />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "h-12 w-full px-4 pl-3 text-left font-bold dark:bg-skin-mirage",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "dd MMM yyyy")
                  ) : (
                    <span className="text-skin-black">
                      {format(new Date(Date.now()), "dd MMM yyyy")}
                    </span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}

export default PaymentDue;
