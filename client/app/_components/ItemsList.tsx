import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PlusIcon, TrashIcon } from "lucide-react";

function ItemsList({ form }) {
  return (
    <div>
      <h3 className="mb-5 mt-8 text-lg font-bold capitalize text-skin-baliHai">
        Item list
      </h3>

      <ul>
        <li className="flex gap-4">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-[2] space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Item Name
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Qty.
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
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1 space-y-3">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Price
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
          <div className="flex flex-[2] justify-around sm:col-span-3">
            <div className="flex flex-col gap-5">
              <label className="text-xs font-medium capitalize text-gray-400">
                Total
              </label>
              <span className="mb-3 font-bold text-skin-shipCove">0.00</span>
            </div>
            <button
              className="col-span-1 mt-4 hidden items-center justify-center sm:mb-4 sm:flex"
              type="button"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
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
