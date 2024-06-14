"use client";

import { useState } from "react";

import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { SignupFormSchema } from "@/lib/definitions";

import Link from "next/link";
import { signupAction } from "@/lib/actions";
import toast from "react-hot-toast";

function SignupForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.output<typeof SignupFormSchema>>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.output<typeof SignupFormSchema>) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("password", data.password);

      const { status, message } = await signupAction(formData);

      if (status === "error") {
        toast.error(message);
      }

      if (status === "success") {
        toast.success(message);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 flex flex-col rounded-md bg-white px-10 py-8 dark:bg-skin-mirage"
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
          {isLoading ? "Signing up..." : "Sign up"}
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
