import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  password: z
    .string({ message: "Can't be empty." })
    .min(4)
    .max(24)
    .trim()
    .refine((value) => !value.includes(" "), {
      message: "Password cannot contain spaces.",
    }),
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  email: z.string({ message: "Can't be empty." }).email().trim(),
});

export const LoginFormSchema = z.object({
  username: z.string({ message: "Can't be empty." }).min(2).max(30).trim(),
  password: z
    .string({ message: "Can't be empty." })
    .min(4)
    .max(24)
    .trim()
    .refine((value) => !value.includes(" "), {
      message: "Password cannot contain spaces.",
    }),
});

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
