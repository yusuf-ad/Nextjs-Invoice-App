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
            <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
              Street Address
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

      <div className="flex gap-3">
        <FormField
          name={`${address}.city`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                City
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
          name={`${address}.postCode`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                Post Code
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
          name={`${address}.country`}
          control={form.control}
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-sm font-normal capitalize text-skin-baliHai">
                Country
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
      </div>
    </div>
  );
}

export default Address;
