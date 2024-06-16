"use server";

import { LoginFormSchema, SignupFormSchema } from "@/lib/auth/definitions";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { createSession } from "./auth/session";
import { handlePrismaError } from "./handlePrismaError";

// Auth actions

export async function signup(formData: FormData) {
  // 1. validate fields on server
  const signupData = Object.fromEntries(formData);
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
    return handlePrismaError(error);
  }

  // 3. Create session
  await createSession(newUser!.id.toString());
}

export async function login(formData: FormData) {
  // 1. validate fields on server
  const loginData = Object.fromEntries(formData);

  const validationResult = LoginFormSchema.safeParse(loginData);

  if (!validationResult.success) {
    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const { username, password } = validationResult.data;

  // 2. Query the database for the user with the given username
  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!user) {
    return {
      status: "error",
      message: "Invalid credentials",
    };
  }

  // 3. Compare the password with the hashed password
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return {
      status: "error",
      message: "Invalid credentials",
    };
  }

  // 4. If login successful, create a session for the user and redirect
  await createSession(user.id);
}

// Invoice actions
