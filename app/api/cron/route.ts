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
        userId: process.env.TEST_ID,
      },
    });

    // Use Promise.all to wait for all invoices to be created
    await Promise.all(
      testInvoices.map(async (invoice) => {
        await prisma.invoice.create({
          // @ts-ignore
          data: {
            ...invoice,
            userId: process.env.TEST_ID,
            invoiceId: generateInvoiceId(),
          },
        });
      }),
    );

    return NextResponse.json(
      { message: "Invoices reset and populated successfully." },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: "Failed to reset and populate invoices",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
