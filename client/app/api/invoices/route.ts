import { NextResponse } from "next/server";
import Invoice from "@/lib/models/invoiceModel"; // Ensure this import is correct
import User from "@/lib/models/userModel";

import { customAlphabet } from "nanoid";
import prisma from "@/prisma";

// export async function GET() {
//   try {
//     const { invoices: userInvoices } = await User.findById(
//       "66349de8e445f0130ad4fc1f",
//     );

//     const invoices = await Invoice.find({ _id: { $in: userInvoices } });

//     return new NextResponse(
//       JSON.stringify({
//         status: "success",
//         results: invoices.length,
//         data: {
//           invoices,
//         },
//       }),
//       { status: 200 },
//     );
//   } catch (error: any) {
//     return new NextResponse(
//       JSON.stringify({ status: "error", message: error.message }),
//       { status: 500 },
//     );
//   }
// }

// Define a custom alphabet that includes letters (and optionally numbers if you want)
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Create a nanoid generator with the desired length and alphabet
const nanoid = customAlphabet(alphabet, 6);

// Generate the ID
const invoiceId = nanoid(); // Example: 'AbC123'

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const paymentTerms = body.paymentTerms.split(" ").at(1);

    console.log(body);

    const invoiceTemplate = {
      invoiceId: nanoid(),
      description: body.description,
      status: body.status,
      paymentDue: body.paymentDue,
      paymentTerms,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      // senderAddress: body.senderAddress,
      items: {
        create: body.items.map((item: any) => ({
          name: item.name,
          qty: item.qty,
          price: item.price,
          totalPrice: item.totalPrice,
          itemId: nanoid(),
          // id field should be omitted or handled appropriately if it's not auto-generated
        })),
      },
      total: body.total,
    };

    const newInvoice = await prisma.invoice.create({
      data: invoiceTemplate,
      include: {
        items: true,
      },
    });

    return Response.json(
      {
        status: "success",
        data: newInvoice,
      },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { status: "error", message: error.message },
      { status: 500 },
    );
  }
}
