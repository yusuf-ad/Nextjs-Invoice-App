// @ts-nocheck
import { testInvoices } from "@/lib/mockup-data";
import { generateInvoiceId } from "@/lib/utils";
import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    if (
      req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // delete all the invoices
    await prisma.invoice.deleteMany({
      where: {
        userId: "66915101d4c35573c9731dcf",
      },
    });

    // Use Promise.all to wait for all invoices to be created
    await Promise.all(
      testInvoices.map(async (invoice) => {
        await prisma.invoice.create({
          data: {
            ...invoice,
            userId: "66915101d4c35573c9731dcf",
            invoiceId: generateInvoiceId(),
          },
        });
      }),
    );

    return new NextResponse(
      JSON.stringify({ message: "Invoices reset and populated successfully." }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    // Return an error response
    return new NextResponse(
      JSON.stringify({
        error: "Failed to reset and populate invoices",
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
