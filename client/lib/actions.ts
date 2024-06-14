"use server";

import { SignupFormSchema } from "@/lib/auth/definitions";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/prisma";
import { createSession } from "./auth/session";
import { redirect } from "next/navigation";

function extractStringBetweenUnderscores(input: string) {
  const match = input.match(/_(.*?)_/);
  return match ? match[1] : null;
}

export async function signupAction(formData: FormData) {
  const signupData = Object.fromEntries(formData);

  // 1. validate fields on server
  const validationResult = SignupFormSchema.safeParse(signupData);

  if (!validationResult.success) {
    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const { username, fullName, email, password } = validationResult.data;

  // 2. Create user

  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser;

  try {
    newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        username,
      },
    });
    // Handle successful user creation (e.g., return newUser or a success message)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        const target = error.meta?.target;

        let message = "A user with this value already exists.";
        if (typeof target === "string") {
          message = `A user with this ${target.split("_").at(1)} already exists.`;
        } else if (Array.isArray(target)) {
          message = `A user with this ${target.join(", ")} already exists.`;
        }
        return {
          status: "error",
          message,
        };
      }
    }
  }

  // 3. Create session
  await createSession(newUser!.id.toString());
}
