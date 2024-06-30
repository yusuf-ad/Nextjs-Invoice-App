import { z } from "zod";

export const ProfileFormSchema = z.object({
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  email: z.string({ message: "Can't be empty." }).email().trim(),
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
});

export const PasswordSchema = z
  .object({
    currentPassword: z
      .string({ message: "Can't be empty." })
      .min(4)
      .max(24)
      .trim()
      .refine((value) => !value.includes(" "), {
        message: "Password cannot contain spaces.",
      }),
    newPassword: z
      .string({ message: "Can't be empty." })
      .min(4)
      .max(24)
      .trim()
      .refine((value) => !value.includes(" "), {
        message: "Password cannot contain spaces.",
      }),
  })
  .refine((values) => values.currentPassword === values.newPassword, {
    message: "Passwords must match!",
  });

export const MyProfileFormSchema = z.object({
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  email: z.string({ message: "Can't be empty." }).email().trim(),
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  photo: z
    .string()
    .optional()
    .refine((value) => value === "" || value?.includes("utfs.io"), {
      message: "Invalid image URL.",
    }),
});
