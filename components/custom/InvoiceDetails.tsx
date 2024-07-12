import { formatDate } from "@/lib/utils";
import InvoiceAddress from "./InvoiceAddress";

function InvoiceDetails({ currentInvoice }: { currentInvoice: any }) {
  return (
    <div className="mt-12 grid grid-cols-4 items-start gap-6 capitalize sm:gap-4">
      <div className="col-span-1">
        <h3 className="mb-2 text-sm text-skin-baliHai">Invoice Date</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {formatDate(new Date(currentInvoice.createdAt!))}
        </p>
        <h3 className="mb-2 text-sm text-skin-baliHai">Payment due</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {formatDate(new Date(currentInvoice.paymentDue))}
        </p>
      </div>

      <div className="col-span-1">
        <h3 className="mb-2 text-sm text-skin-baliHai">Bill to</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {currentInvoice.clientName}
        </p>
        <InvoiceAddress address={currentInvoice.clientAddress} />
      </div>

      <div className="row-start-2 row-end-3 flex flex-col justify-center text-left md:col-span-2 md:row-auto">
        <h3 className="mb-2 text-sm text-skin-baliHai">Sent To</h3>
        <p className="mb-6 text-lg font-bold lowercase text-skin-black">
          {currentInvoice.clientEmail}
        </p>
      </div>
    </div>
  );
}

export default InvoiceDetails;
