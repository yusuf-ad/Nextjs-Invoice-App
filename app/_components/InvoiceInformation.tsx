import DeleteInvoiceButton from "@/app/_components/DeleteInvoiceButton";
import EditInvoiceButton from "@/app/_components/EditInvoiceButton";
import InvoiceAddress from "@/app/_components/InvoiceAddress";
import InvoiceDetails from "@/app/_components/InvoiceDetails";
import InvoiceStatus from "@/app/_components/InvoiceStatus";
import ItemsTable from "@/app/_components/ItemsTable";
import { getInvoice } from "@/lib/data-service";
import Link from "next/link";
import InvoiceNotFound from "./InvoiceNotFound";

async function InvoiceInformation({ invoiceId }: { invoiceId: string }) {
  const currentInvoice = await getInvoice(invoiceId);

  if (!currentInvoice) return <InvoiceNotFound invoiceId={invoiceId} />;

  return (
    <>
      <div className="mt-8 flex w-full justify-between rounded-md bg-white px-6 py-6 text-sm text-skin-baliHai dark:bg-skin-mirage">
        <div className="flex w-full items-center justify-between gap-6 md:justify-start">
          <p>Status</p>
          <InvoiceStatus status={currentInvoice.status} />
        </div>

        <div className="hidden items-center space-x-3 md:flex">
          <EditInvoiceButton />

          <DeleteInvoiceButton invoiceId={currentInvoice?.invoiceId} />

          <button className="btn-sm min-w-max bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70">
            Mark as Paid
          </button>
        </div>

        <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center gap-3 bg-white shadow-2xl shadow-slate-600 dark:bg-skin-mirage md:hidden">
          <EditInvoiceButton />

          <DeleteInvoiceButton invoiceId={currentInvoice?.invoiceId} />

          <button className="btn-sm min-w-max bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70">
            Mark as Paid
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white px-6 py-8 dark:bg-skin-mirage">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <p className="text-xs font-bold text-skin-shipCove">
              #
              <span className="text-sm text-skin-black">
                {currentInvoice.invoiceId}
              </span>
            </p>
            <p className="mt-2 text-sm text-skin-baliHai">
              {currentInvoice.description}
            </p>
          </div>
          <InvoiceAddress address={currentInvoice.senderAddress} />
        </div>

        <InvoiceDetails currentInvoice={currentInvoice} />

        <ItemsTable currentInvoice={currentInvoice} />
      </div>
    </>
  );
}

export default InvoiceInformation;
