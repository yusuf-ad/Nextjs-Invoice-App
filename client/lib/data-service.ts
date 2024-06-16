import prisma from "@/prisma";
import { verifySession } from "./auth/session";

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
    });

    console.log(typeof invoices.at(0)?.paymentDue);

    return invoices;
  } catch (error) {
    throw new Error("Failed to fetch invoices");
  }
}
