import "server-only";

import prisma from "@/prisma";
import { cookies } from "next/headers";
import { decrypt, verifySession } from "./auth/session";

export async function getInvoices() {
  try {
    // 1. Check authentication
    const session = await verifySession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // 2. Fetch invoices from database
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: session.userId,
      },
      select: {
        invoiceId: true,
        description: true,
        status: true,
        paymentDue: true,
        paymentTerms: true,
        clientName: true,
        clientEmail: true,
        total: true,
        items: true,
        senderAddress: true,
        clientAddress: true,
        createdAt: true,
      },
    });

    return invoices;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch invoices");
  }
}

export async function getInvoice(invoiceId: string) {
  try {
    // 1. Check authentication
    const session = await verifySession();

    if (!session) {
      throw new Error("Unauthorized");
    }

    // 2. Fetch invoice from database
    const invoice = await prisma.invoice.findFirst({
      where: {
        userId: session.userId,
        invoiceId,
      },
      select: {
        invoiceId: true,
        description: true,
        status: true,
        total: true,
        items: true,
        createdAt: true,
        paymentDue: true,
        paymentTerms: true,
        senderAddress: true,
        clientAddress: true,
        clientName: true,
        clientEmail: true,
      },
    });

    return invoice;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch invoice");
  }
}

export async function hasAuth(): Promise<{
  status: string;
  userId?: string;
  message?: string;
}> {
  const cookie = cookies().get("session")?.value;

  const session = await decrypt(cookie);

  if (!session?.userId) {
    return {
      status: "error",
      message: "Unauthorized",
    };
  }

  return {
    status: "success",
    userId: session.userId as string,
  };
}

export async function getMyInfo(): Promise<
  | {
      username: string;
      email: string;
      fullName: string;
      photo: string;
    }
  | { status: string; message: string }
> {
  try {
    // 1. Check authentication
    const session = await verifySession();

    // 2. Fetch user from database
    const user = await prisma.user.findUnique({
      where: {
        id: session.userId as string,
      },
      select: {
        username: true,
        email: true,
        fullName: true,
        photo: true,
      },
    });

    if (!user) throw new Error("User not found");

    return user;
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "User not found. You are being logged out.",
    };
  }
}
