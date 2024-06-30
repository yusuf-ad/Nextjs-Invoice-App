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

import { ProfileFormSchema } from "@/lib/definitions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type ProfileInfoFormProps = {
  fullName: string;
  username: string;
  email: string;
  photo: string;
};

function ProfileInfoForm({
  profile,
  newAvatar,
  clearAvatar,
}: {
  profile: ProfileInfoFormProps;
  newAvatar: string;
  clearAvatar: () => void;
}) {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: profile,
  });

  const { dirtyFields } = form.formState;

  function onSubmit(data: z.output<typeof ProfileFormSchema>) {
    console.log("avatar", newAvatar);
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
        <div className="space-y-4">
          <FormField
            name="fullName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input
                    className="font-semibold capitalize text-skin-black"
                    type="text"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className="font-semibold text-skin-black"
                    type="text"
                    {...field}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="font-semibold text-skin-black"
                    type="email"
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
          disabled={!Object.keys(dirtyFields).length || newAvatar !== ""}
          className="btn-sm mt-8 self-end rounded-md bg-purple-600 font-bold tracking-wide text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-700 dark:hover:bg-purple-700"
        >
          Update Profile
        </button>
      </form>
    </Form>
  );
}

export default ProfileInfoForm;
