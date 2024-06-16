import prisma from "@/prisma";
import { verifySession } from "./auth/session";

export async function getInvoices() {
  try {
    // 1. Check authentication
    const session = await verifySession();

    if (!session) {
      return {
        status: "error",
        message: "Unauthorized",
      };
    }

    // 2. Fetch invoices from database
    const invoices = await prisma.invoice.findMany({
      where: {
        userId: session.userId,
      },
    });

    return invoices;
  } catch (error) {
    return {
      status: "error",
      message: "Failed to fetch invoices",
    };
  }
}
