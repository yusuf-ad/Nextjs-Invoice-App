// @ts-nocheck
import { NextApiRequest, NextApiResponse } from "next";
import { testInvoices } from "@/lib/mockup-data";
import { generateInvoiceId } from "@/lib/utils";
import prisma from "@/prisma";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
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

    // Return a success response
    res
      .status(200)
      .json({ message: "Invoices reset and populated successfully." });
  } catch (error) {
    // Return an error response
    res.status(500).json({
      error: "Failed to reset and populate invoices",
      details: error.message,
    });
  }
}
