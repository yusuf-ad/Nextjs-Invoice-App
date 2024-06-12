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
import { login } from "@/lib/data-service";
import { useForm } from "react-hook-form";
import Link from "next/link";

const formSchema = z.object({
  username: z.string().min(2).max(30),
  password: z.string().min(4).max(24),
});

function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(loginCreds: z.infer<typeof formSchema>) {
    await login(loginCreds);

    location.href = "/app";
  }

  return (
    <Form {...form}>
      <form
        // action={login}
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
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <button className="btn-md mt-2 w-full bg-skin-purple font-extrabold text-skin-white disabled:cursor-not-allowed disabled:opacity-50">
            Log in
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
