import { connect } from "@/lib/database";
import { NextResponse } from "next/server";
import Invoice from "@/lib/models/invoiceModel"; // Ensure this import is correct
import User from "@/lib/models/userModel";

export async function GET() {
  try {
    await connect();

    const { invoices: userInvoices } = await User.findById(
      "66349de8e445f0130ad4fc1f",
    );

    const invoices = await Invoice.find({ _id: { $in: userInvoices } });

    return new NextResponse(
      JSON.stringify({
        status: "success",
        results: invoices.length,
        data: {
          invoices,
        },
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 },
    );
  }
}
