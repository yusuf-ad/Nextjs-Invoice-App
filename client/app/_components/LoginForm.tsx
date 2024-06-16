"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { login } from "@/lib/data-service";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginFormSchema } from "@/lib/auth/definitions";
import { login } from "@/lib/actions";
import toast from "react-hot-toast";

function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const { status, message } = (await login(formData)) ?? {
      status: "",
      message: "",
    };

    if (status === "error") {
      toast.error(message);
    }

    toast.success("Logged in succesfully.");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 flex flex-col rounded-md bg-white px-8 py-6 dark:bg-skin-mirage"
      >
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="username"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    value={field.value?.trim() || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className="btn-md mt-2 w-full bg-skin-purple font-extrabold text-skin-white disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? "Logging..." : "Login"}
          </button>
        </div>

        <p className="mt-8">
          New Customer?{" "}
          <Link
            className="hover:text-purple underline underline-offset-2"
            href={"/signup"}
          >
            Click to Sign up
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default LoginForm;
