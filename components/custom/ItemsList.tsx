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
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function ItemsList({ fields, form, append, remove }) {
  return (
    <div>
      <h3 className="mb-6 mt-8 text-lg font-bold capitalize text-skin-baliHai">
        Item list
      </h3>

      <ul className="space-y-5">
        {fields.length > 0 ? (
          fields.map((field, index) => (
            <Item key={field.id} remove={remove} index={index} form={form} />
          ))
        ) : (
          <p className="text-lg font-medium text-skin-burntSienna">
            No items added yet. Please click the button below to add a new item.
          </p>
        )}
      </ul>

      <button
        onClick={() => {
          append({
            name: "New Item",
            qty: 1,
            price: 0,
            totalPrice: 0,
            id: nanoid(4),
          });
        }}
        type="button"
        className="transition-colors-1 mt-8 flex w-full items-center justify-center gap-1 rounded-full border-2 border-transparent bg-skin-offWhite py-4 text-xs font-bold capitalize tracking-wide text-skin-baliHai hover:border-skin-purple dark:bg-skin-mirage"
      >
        <PlusIcon className="mb-1 h-5 w-5 text-skin-mirage dark:text-white" />
        Add new item
      </button>
    </div>
  );
}

export default ItemsList;

function Item({ form, index, remove }) {
  const [total, setTotal] = useState(0);

  const qty = form.watch(`items.${index}.qty`);
  const price = form.watch(`items.${index}.price`);

  useEffect(() => {
    const numericQty = isNaN(+qty) ? 0 : +qty;
    const numericPrice = isNaN(+price) ? 0 : +price;
    const calculatedTotal = numericQty * numericPrice;

    form.setValue(`items.${index}.totalPrice`, calculatedTotal);

    setTotal(calculatedTotal);
  }, [qty, price, form, index]);

  return (
    <li className="flex flex-col gap-6">
      <div className="flex gap-4">
        <FormField
          name={`items.${index}.name`}
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
                  placeholder="New Item"
                  className="h-12 px-4 font-bold capitalize dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={`items.${index}.qty`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <div className="flex justify-between">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Qty.
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  type="number"
                  className="h-12 px-4 font-bold dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={`items.${index}.price`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex-1 space-y-3">
              <div className="flex justify-between">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Price
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  type="number"
                  className="h-12 px-4 font-bold dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="hidden flex-[2] flex-col sm:col-span-3 sm:flex">
          <label className="mb-6 ml-8 mt-1 text-sm font-normal capitalize text-skin-baliHai">
            Total
          </label>
          <div className="flex justify-around gap-7">
            <span className="mb-3 font-bold text-skin-shipCove">
              {total.toFixed(2)}
            </span>
            <button
              onClick={() => remove(index)}
              className="col-span-1 hidden sm:flex"
              type="button"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="mr-8 flex flex-col items-end justify-center sm:col-span-3 sm:hidden">
        <label className="text-sm font-normal capitalize text-skin-baliHai">
          Total
        </label>
        <div className="">
          <span className="mb-3 font-bold text-skin-shipCove">
            {total.toFixed(2)}
          </span>
          <button
            onClick={() => remove(index)}
            className="col-span-1 hidden sm:flex"
            type="button"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </li>
  );
}
