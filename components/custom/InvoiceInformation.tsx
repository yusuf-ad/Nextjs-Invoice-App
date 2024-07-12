import InvoiceNotFound from "./InvoiceNotFound";
import EditInvoiceModal from "./EditInvoiceModal";
import ButtonMarkAsPaid from "./ButtonMarkAsPaid";
import InvoiceStatus from "./InvoiceStatus";
import DeleteInvoiceButton from "./DeleteInvoiceButton";
import InvoiceAddress from "./InvoiceAddress";
import InvoiceDetails from "./InvoiceDetails";
import ItemsTable from "./ItemsTable";

import { getInvoice } from "@/server/data-service";

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

        {/* desktop buttons */}
        <div className="hidden items-center space-x-3 md:flex">
          <EditInvoiceModal currentInvoice={currentInvoice} />

          <DeleteInvoiceButton invoiceId={currentInvoice?.invoiceId} />

          {currentInvoice.status === "pending" && (
            <ButtonMarkAsPaid invoiceId={currentInvoice.invoiceId} />
          )}
        </div>

        {/* mobile  buttons*/}
        <div className="fixed bottom-0 left-0 flex h-20 w-full items-center justify-center gap-3 bg-white shadow-2xl shadow-slate-600 dark:bg-skin-mirage md:hidden">
          <EditInvoiceModal currentInvoice={currentInvoice} />

          <DeleteInvoiceButton invoiceId={currentInvoice?.invoiceId} />

          {currentInvoice.status === "pending" && (
            <ButtonMarkAsPaid invoiceId={currentInvoice.invoiceId} />
          )}
        </div>
      </div>

      <div className="mt-4 w-full rounded-md bg-white px-6 py-8 dark:bg-skin-mirage">
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
