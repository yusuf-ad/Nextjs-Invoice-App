import { NextResponse } from "next/server";
import Invoice from "@/lib/models/invoiceModel"; // Ensure this import is correct
import User from "@/lib/models/userModel";

import { customAlphabet } from "nanoid";
import prisma from "@/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth/session";

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
export async function POST(request: Request) {
  try {
    // const cookie = cookies().get("session")?.value;

    // const session = await decrypt(cookie);

    // console.log(session);

    // if (!session?.userId) {
    //   return new Response(
    //     JSON.stringify({ status: "error", message: "Unauthorized" }),
    //     {
    //       status: 401,
    //       headers: { "Content-Type": "application/json" },
    //     },
    //   );
    // }

    const body = await request.json();

    // Assuming `paymentTerms` is a string that you want to directly assign
    const paymentTerms = body.paymentTerms;

    console.log(body);

    const invoiceTemplate = {
      invoiceId: nanoid(), // Ensure you have imported `nanoid`
      description: body.description,
      status: body.status, // Make sure this matches one of the enum values: 'pending', 'paid', 'draft'
      paymentDue: body.paymentDue,
      paymentTerms,
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientAddress: body.clientAddress, // Directly assigning JSON object
      senderAddress: body.senderAddress, // Directly assigning JSON object
      items: body.items, // Directly assigning JSON array
      total: body.total,
      userId: "666dadcad23ece684be02b5a",
      // If you have a userId, include it here. Otherwise, remove this line.
      // userId: "someUserId",
    };

    const newInvoice = await prisma.invoice.create({
      data: invoiceTemplate,
      // Assuming you want to return the created invoice without relations (since they are JSON fields)
    });

    return new Response(
      JSON.stringify({
        status: "success",
        data: newInvoice,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } },
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
