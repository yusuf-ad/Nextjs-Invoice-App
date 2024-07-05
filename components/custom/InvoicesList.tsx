import Invoice from "./Invoice";

function InvoicesList({ invoices }: { invoices: any[] }) {
  return (
    <ul className="space-y-4 py-10">
      {invoices.map((invoice) => (
        <Invoice invoice={invoice} key={invoice.invoiceId} />
      ))}
    </ul>
  );
}

export default InvoicesList;
