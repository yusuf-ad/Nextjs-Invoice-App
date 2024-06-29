"use client";

import { Button } from "@/components/ui/button";
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
import { CameraIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProfileFormSchema = z.object({
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  email: z.string({ message: "Can't be empty." }).email().trim(),
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
});

function ProfilePage() {
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
  });

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1 py-4 pl-4">
        <form className="relative">
          <label htmlFor="photo">
            <img
              className="h-24 w-24 cursor-pointer rounded-full hover:opacity-85"
              src={
                "https://avatars.mds.yandex.net/i?id=330af41273106bca8572b59d7b643c611d32d2ee-12496338-images-thumbs&n=13"
              }
              alt={`profile image`}
            />
            <div className="absolute -bottom-2 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-skin-mirage2">
              <CameraIcon
                className="h-6 w-6 text-white hover:opacity-85"
                strokeWidth={"2px"}
              />
            </div>
          </label>

          <input className="hidden" type="file" name="photo" id="photo" />
        </form>
      </div>

      <div className="col-span-3 p-4 pt-0">
        <Form {...form}>
          <form>
            <div className="space-y-4">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fullname</FormLabel>
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
                name="username"
                control={form.control}
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
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <button
              type="submit"
              className="btn-sm float-right mt-8 rounded-md bg-skin-purple font-bold tracking-wide text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              Update Profile
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ProfilePage;
