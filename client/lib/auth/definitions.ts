import { z } from "zod";

export const SignupFormSchema = z.object({
  username: z.string({ message: "Can't be empty." }).min(2).max(30),
  fullName: z.string({ message: "Can't be empty." }).min(2).max(30),
  email: z.string({ message: "Can't be empty." }).email(),
  password: z.string({ message: "Can't be empty." }).min(4).max(24),
});

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};
