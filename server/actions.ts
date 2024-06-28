"use server";

import { InvoiceSchema, type InvoiceType } from "@/lib/definitions/invoice";

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
        username: username,
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
}

// * Invoice actions

export async function createInvoice(formData: FormData) {
  // 1. validate the user input
  const { clientAddress, senderAddress, items, paymentDue, ...otherData } =
    Object.fromEntries(formData);

  const parsedClientAddress = JSON.parse(clientAddress as string);
  const parsedSenderAddress = JSON.parse(senderAddress as string);
  const parsedItems = JSON.parse(items as string);
  const parsedPaymentDue = new Date(paymentDue as string); // Assuming paymentDue is a date string

  const validationResult = InvoiceSchema.safeParse({
    clientAddress: parsedClientAddress,
    senderAddress: parsedSenderAddress,
    items: parsedItems,
    paymentDue: parsedPaymentDue,
    ...otherData,
  });

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

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. create invoice
  const newInvoice = await prisma.invoice.create({
    data: {
      invoiceId: generateInvoiceId(),
      ...validationResult.data,
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

export async function createDraftInvoice(formData: FormData) {
  // 1. validate the user input
  const { clientAddress, senderAddress, items, paymentDue, ...otherData } =
    Object.fromEntries(formData);

  const parsedClientAddress = JSON.parse(clientAddress as string);
  const parsedSenderAddress = JSON.parse(senderAddress as string);
  const parsedItems = JSON.parse(items as string);
  const parsedPaymentDue = new Date(paymentDue as string); // Assuming paymentDue is a date string

  const validationResult = DraftInvoiceSchema.safeParse({
    ...otherData,
    status: "draft",
    clientAddress: parsedClientAddress,
    senderAddress: parsedSenderAddress,
    items: parsedItems,
    paymentDue: parsedPaymentDue,
  });

  if (!validationResult.success) {
    console.log(JSON.stringify(validationResult.error));

    return {
      status: "error",
      message: "Invalid data. Please check the fields.",
    };
  }

  const totalValue =
    validationResult.data.items.reduce((acc, cur) => acc + cur.totalPrice, 0) ??
    0;

  // 2. check if the user is authenticated
  const session = await verifySession();

  // 3. create draft invoice
  const newInvoice = await prisma.invoice.create({
    data: {
      invoiceId: generateInvoiceId(),
      ...validationResult.data,
      total: totalValue,
      userId: session.userId,
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
