import { InvoiceType } from "@/lib/definitions/invoice";
import Invoice from "./Invoice";

type InvoicesListProps = {
  invoices: InvoiceType[];
};

function InvoicesList({ invoices }: InvoicesListProps) {
  return (
    <ul className="space-y-4 py-10">
      {invoices.map((invoice) => (
        <Invoice invoice={invoice} key={invoice.invoiceId} />
      ))}
    </ul>
  );
}

export default InvoicesList;
