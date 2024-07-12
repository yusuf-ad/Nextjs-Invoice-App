import { formatDate } from "@/lib/utils";
import InvoiceAddress from "./InvoiceAddress";

function InvoiceDetails({ currentInvoice }: { currentInvoice: any }) {
  return (
    <div className="mt-12 grid grid-cols-4 items-start gap-6 capitalize sm:gap-4">
      <div className="col-span-2 md:col-span-1">
        <h3 className="mb-2 min-w-max text-xs text-skin-baliHai sm:text-sm">
          Invoice Date
        </h3>
        <p className="mb-6 font-bold text-skin-black md:text-lg">
          {formatDate(new Date(currentInvoice.createdAt!))}
        </p>
        <h3 className="mb-2 min-w-max text-xs text-skin-baliHai sm:text-sm">
          Payment due
        </h3>
        <p className="mb-6 font-bold text-skin-black md:text-lg">
          {formatDate(new Date(currentInvoice.paymentDue))}
        </p>
      </div>

      <div className="col-span-2 md:col-span-1">
        <h3 className="mb-2 text-xs text-skin-baliHai sm:text-sm">Bill to</h3>
        <p className="mb-6 font-bold text-skin-black md:text-lg">
          {currentInvoice.clientName}
        </p>
        <InvoiceAddress address={currentInvoice.clientAddress} />
      </div>

      <div className="row-start-2 row-end-3 flex flex-col justify-center text-left md:col-span-2 md:row-auto">
        <h3 className="mb-2 min-w-max text-xs text-skin-baliHai sm:text-sm">
          Sent To
        </h3>
        <p className="min-wmin mb-6 font-bold lowercase text-skin-black md:text-lg">
          {currentInvoice.clientEmail}
        </p>
      </div>
    </div>
  );
}

export default InvoiceDetails;
