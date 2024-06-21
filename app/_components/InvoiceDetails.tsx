import { formatDate } from "@/lib/utils";
import InvoiceAddress from "./InvoiceAddress";

function InvoiceDetails({ currentInvoice }) {
  return (
    <div className="mt-12 flex gap-4 capitalize">
      <div className="basis-1/4">
        <h3 className="mb-2 text-sm text-skin-baliHai">Invoice Date</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {formatDate(new Date(currentInvoice.createdAt))}
        </p>
        <h3 className="mb-2 text-sm text-skin-baliHai">Payment due</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {formatDate(new Date(currentInvoice.paymentDue))}
        </p>
      </div>
      <div className="basis-1/4">
        <h3 className="mb-2 text-sm text-skin-baliHai">Bill to</h3>
        <p className="mb-6 text-lg font-bold text-skin-black">
          {currentInvoice.clientName}
        </p>
        <InvoiceAddress address={currentInvoice.clientAddress} />
      </div>
      <div className="flex flex-1 justify-center text-left">
        <div>
          <h3 className="mb-2 text-sm text-skin-baliHai">Sent To</h3>
          <p className="mb-6 text-lg font-bold lowercase text-skin-black">
            {currentInvoice.clientEmail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
