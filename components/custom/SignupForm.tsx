"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignupFormSchema } from "@/lib/definitions/auth";

import Link from "next/link";
import { signup } from "@/server/actions";
import toast from "react-hot-toast";

function SignupForm() {
  const form = useForm<z.output<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.output<typeof SignupFormSchema>) {
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const { status, message } = (await signup(formData)) ?? {
        status: "",
        message: "",
      };

      if (status === "error") {
        return toast.error(message);
      }

      toast.success("Signed up succesfully.");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 flex w-full flex-col rounded-md bg-white px-6 py-4 dark:bg-skin-mirage sm:px-10 sm:py-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your fullname</FormLabel>
                <FormControl>
                  <Input
                    className="capitalize"
                    type="text"
                    placeholder="John Doe"
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Create your username</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="email@gmail.com"
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
                <FormLabel>Create your password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="password"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <button className="btn-md mt-10 w-full bg-skin-purple font-extrabold text-skin-white disabled:cursor-not-allowed disabled:opacity-50">
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        <p className="mt-8 text-skin-black">
          Already a Customer?{" "}
          <Link
            className="hover:text-purple underline underline-offset-2"
            href={"/login"}
          >
            Click to Log in
          </Link>
        </p>
      </form>
    </Form>
  );
}

export default SignupForm;
