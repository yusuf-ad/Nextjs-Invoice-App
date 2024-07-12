import Invoice from "./Invoice";

function InvoicesList({ invoices }: { invoices: any[] }) {
  const sortedInvoices = invoices.sort(
    (a, b) =>
      new Date(b.paymentDue).getTime() - new Date(a.paymentDue).getTime(),
  );

  return (
    <ul className="space-y-4 py-10">
      {sortedInvoices.map((invoice) => (
        <Invoice invoice={invoice} key={invoice.invoiceId} />
      ))}
    </ul>
  );
}

export default InvoicesList;
