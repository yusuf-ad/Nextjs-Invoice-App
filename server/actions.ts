"use server";

import {
  InvoiceSchema,
  NewInvoiceType,
  type InvoiceType,
} from "@/lib/definitions/invoice";

import bcrypt from "bcrypt";
import prisma from "@/prisma";
import {
  createSession,
  deleteSession,
  verifySession,
} from "@/server/auth/session";
import { handlePrismaError } from "./handlePrismaError";
import { generateInvoiceId } from "../lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { SignupFormSchema, LoginFormSchema } from "@/lib/definitions/auth";
import { DraftInvoiceSchema } from "@/lib/definitions/draftInvoice";
import {
  MyProfileFormSchema,
  PasswordSchema,
  type UpdateProfileType,
} from "@/lib/definitions/profile";
import { ratelimit } from "./rate-limit";

// * Auth actions
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
  let user;

  try {
    user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
  } catch (error) {
    return handlePrismaError(error);
  }

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

export async function logout() {
  await deleteSession();

  redirect("/");
}

export async function updateMyProfile(userInfo: UpdateProfileType) {
  // 1. validate the user input
  const validationResult = MyProfileFormSchema.safeParse(userInfo);

  if (!validationResult.success) {
    return {
      status: "error",
      message: validationResult.error.errors[0].message,
    };
  }

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. update user profile
  const updatedData = {
    ...validationResult.data,
    photo: validationResult.data.photo || undefined,
  };

  console.log(updatedData);

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: session.userId as string,
      },
      data: updatedData,
    });
  } catch (err) {
    return handlePrismaError(err);
  }

  revalidatePath("/profile");
}

export async function changeMyPassword(passwordData: {
  currentPassword: string;
  newPassword: string;
}) {
  // 1. validate the user input
  const validationResult = PasswordSchema.safeParse(passwordData);

  if (!validationResult.success) {
    return {
      status: "error",
      message: validationResult.error.errors[0].message,
    };
  }

  const { currentPassword, newPassword } = validationResult.data;

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. change user password
  const user = await prisma.user.findUnique({
    where: {
      id: session.userId as string,
    },
  });

  if (!user) {
    return {
      status: "error",
      message: "User not found",
    };
  }

  // 4. Compare the password with the hashed password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordMatch) {
    return {
      status: "error",
      message: "The provided password does not match your current password!",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: {
      id: session.userId as string,
    },
    data: {
      password: hashedPassword,
    },
  });

  if (!updatedUser) {
    return {
      status: "error",
      message: "Failed to update password",
    };
  }

  // 5. logout user
  await deleteSession();

  // 6. redirect to homepage
  redirect("/");
}

// * Invoice actions

export async function createInvoice(invoiceData: NewInvoiceType) {
  // 1. validate the user input
  const validationResult = InvoiceSchema.safeParse(invoiceData);

  if (!validationResult.success) {
    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const totalValue = validationResult.data.items.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );

  const { success } = await ratelimit.limit("create");

  if (!success) {
    return {
      status: "error",
      message: "Failed to create invoice",
    };
  }

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. create invoice
  const newInvoice = await prisma.invoice.create({
    data: {
      ...validationResult.data,
      invoiceId: generateInvoiceId(),
      status: "pending",
      total: totalValue,
      userId: session.userId as string,
    },
  });

  if (!newInvoice) {
    return {
      status: "error",
      message: "Failed to create invoice",
    };
  }

  revalidatePath("/app");
}

export async function editInvoice(invoiceId: string, invoiceData: InvoiceType) {
  // 1. validate the user input
  const validationResult = InvoiceSchema.safeParse(invoiceData);

  if (!validationResult.success) {
    console.log("error 💩");

    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const totalValue = validationResult.data.items.reduce(
    (acc, cur) => acc + cur.totalPrice,
    0,
  );

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. edit invoice
  const updatedInvoice = await prisma.invoice.updateMany({
    where: {
      invoiceId,
      userId: session.userId,
    },
    data: { ...validationResult.data, total: totalValue },
  });

  if (!updatedInvoice) {
    return {
      status: "error",
      message: "Failed to update invoice",
    };
  }

  revalidatePath(`/app/invoice/${invoiceId}`);
}

export async function createDraftInvoice(invoiceData: NewInvoiceType) {
  // 1. validate the user input
  const validationResult = DraftInvoiceSchema.safeParse(invoiceData);

  if (!validationResult.success) {
    console.log(JSON.stringify(validationResult.error));

    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const totalValue = validationResult.data.items.reduce(
    (acc, cur) => acc + cur.totalPrice!,
    0,
  );

  const { success } = await ratelimit.limit("draft");

  if (!success) {
    return {
      status: "error",
      message: "Rate limit exceeded. Please try again 15 minutes later.",
    };
  }

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. create draft invoice
  const newInvoice = await prisma.invoice.create({
    data: {
      ...validationResult.data,
      invoiceId: generateInvoiceId(),
      total: totalValue,
      userId: session.userId as string,
      status: "draft",
    },
  });

  if (!newInvoice) {
    return {
      status: "error",
      message: "Failed to create invoice",
    };
  }

  revalidatePath("/app");
}

export async function markAsPaid(invoiceId: string) {
  try {
    // 1. check if the user is authenticated
    const session = await verifySession();

    // 2. update invoice status
    const updatedInvoice = await prisma.invoice.updateMany({
      where: {
        invoiceId,
        userId: session.userId,
        status: "pending",
      },
      data: {
        status: "paid",
      },
    });

    if (updatedInvoice.count === 0) {
      throw new Error("Invoice not found or already marked as paid");
    }

    revalidatePath(`/app/invoice/${invoiceId}`);
  } catch (error) {
    handlePrismaError(error);
  }
}

export async function deleteInvoice(invoiceId: string) {
  try {
    // 1. check if the user is authenticated
    const session = await verifySession();

    // 2. delete invoice
    await prisma.invoice.deleteMany({
      where: {
        invoiceId,
        userId: session.userId,
      },
    });
  } catch (error) {
    handlePrismaError(error);
  }

  redirect("/app");
}
