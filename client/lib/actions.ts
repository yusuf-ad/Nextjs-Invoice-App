"use server";

import { redirect } from "next/navigation";
import { SignupFormSchema } from "@/lib/definitions";
import bcrypt from "bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "@/prisma";

export async function signupAction(formData: FormData) {
  try {
    const signupData = Object.fromEntries(formData);

    // 1. validate fields on server
    const validationResult = SignupFormSchema.safeParse(signupData);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (!validationResult.success) {
      return {
        status: "error",
        message: "Invalid data. Please check the fields.",
      };
    }

    const { username, fullName, email, password } = validationResult.data;

    // 2. Create user

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        username,
      },
    });

    console.log(newUser);

    return {
      status: "success",
      message: "User created successfully.",
    };
  } catch (error: any) {
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
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
}
