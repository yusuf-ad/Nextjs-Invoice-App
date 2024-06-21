import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function Address({ form, address }) {
  return (
    <div className="space-y-4">
      <FormField
        name={`${address}.street`}
        control={form.control}
        render={({ field }) => (
          <FormItem className="space-y-3">
            <div className="flex justify-between">
              <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                Street Address
              </FormLabel>
              <FormMessage />
            </div>
            <FormControl>
              <Input
                className="h-12 px-4 font-bold capitalize dark:bg-skin-mirage"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div className="flex gap-3">
        <FormField
          name={`${address}.city`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex justify-between">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  City
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="h-12 px-4 font-bold capitalize dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={`${address}.postCode`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex justify-between">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Post Code
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="h-12 px-4 font-bold capitalize dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name={`${address}.country`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <div className="flex justify-between">
                <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                  Country
                </FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  className="h-12 px-4 font-bold capitalize dark:bg-skin-mirage"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default Address;
