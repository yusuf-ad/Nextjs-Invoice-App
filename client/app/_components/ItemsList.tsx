"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

function ItemsList({ form }) {
  const [total, setTotal] = useState(0);

  const qty = form.watch("items[0].qty");
  const price = form.watch("items[0].price");

  useEffect(() => {
    const numericQty = isNaN(+qty) ? 0 : +qty;
    const numericPrice = isNaN(+price) ? 0 : +price;
    const calculatedTotal = numericQty * numericPrice;

    form.setValue("items[0].totalPrice", calculatedTotal);

    setTotal(calculatedTotal);
  }, [qty, price, form]);

  return (
    <div>
      <h3 className="mb-5 mt-8 text-lg font-bold capitalize text-skin-baliHai">
        Item list
      </h3>

      <ul>
        <li className="flex gap-4">
          <FormField
            name="items[0].name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-[2] space-y-3">
                <div className="flex justify-between">
                  <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                    Item Name
                  </FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    defaultValue={"New Item"}
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="items[0].qty"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Qty.
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    defaultValue={1}
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="items[0].price"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    defaultValue={0}
                    className="h-12 px-4 font-bold dark:bg-skin-mirage"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-[2] flex-col sm:col-span-3">
            <label className="mb-6 ml-8 mt-1 text-sm font-normal capitalize text-skin-baliHai">
              Total
            </label>
            <div className="flex justify-around gap-7">
              <span className="mb-3 font-bold text-skin-shipCove">
                {total.toFixed(2)}
              </span>
              <button className="col-span-1 hidden sm:flex" type="button">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </li>
      </ul>

      <button
        type="button"
        className="transition-colors-1 mt-8 flex w-full items-center justify-center gap-1 rounded-full border-2 border-transparent bg-skin-offWhite py-4 text-xs font-bold capitalize tracking-wide text-skin-baliHai hover:border-skin-purple dark:bg-skin-mirage"
      >
        <PlusIcon className="mb-1 h-5 w-5 text-skin-mirage" />
        Add new item
      </button>
    </div>
  );
}

export default ItemsList;
