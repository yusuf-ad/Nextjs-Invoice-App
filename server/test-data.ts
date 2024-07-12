import { testInvoices } from "@/lib/mockup-data";
import { generateInvoiceId } from "@/lib/utils";
import prisma from "@/prisma";
import cron from "node-cron";

export async function createTestData() {
  // delete all the invoices
  await prisma.invoice.deleteMany({
    where: {
      userId: "66915101d4c35573c9731dcf",
    },
  });

  testInvoices.forEach(async (invoice) => {
    await prisma.invoice.create({
      data: {
        ...invoice,
        userId: "66915101d4c35573c9731dcf",
        invoiceId: generateInvoiceId(),
      },
    });
  });
}

// Function to start the interval
function startInterval() {
  // Call the function immediately at start
  createTestData();

  // 43200000 milliseconds = 12 hours
  setInterval(() => {
    createTestData();
  }, 43200000);
}

// Start the interval
startInterval();

// Schedule the task to run every 12 hours
cron.schedule("0 */12 * * *", () => {
  createTestData();
});
