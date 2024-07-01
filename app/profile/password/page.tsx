"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordSchema } from "@/lib/definitions/profile";
import { changeMyPassword } from "@/server/actions";
import toast from "react-hot-toast";

function PasswordPage() {
  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
  });

  async function onSubmit(data: z.output<typeof PasswordSchema>) {
    const { status, message } = (await changeMyPassword(data)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      return toast.error(message);
    }

    toast.success("Password changed successfully. Logging out now.");
  }

  return (
    <div className="mx-auto max-w-sm space-y-7 p-2">
      <h2 className="text-lg">
        Change your password here. After saving, you&lsquo;ll be logged out.
      </h2>

      <Form {...form}>
        <form className="flex flex-col" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              name="currentPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      className="font-semibold text-skin-black"
                      type="password"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      className="font-semibold text-skin-black"
                      type="password"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      className="font-semibold text-skin-black"
                      type="password"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            className="btn-sm mt-8 self-end rounded-md bg-purple-600 font-bold tracking-wide text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-700"
          >
            {form.formState.isSubmitting ? "Saving..." : "Change Password"}
          </button>
        </form>
      </Form>
    </div>
  );
}

export default PasswordPage;
