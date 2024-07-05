function InvoicesCount({ numInvoices }: { numInvoices: number }) {
  return (
    <div className="space-y-2 xl:space-y-3">
      <h2 className="text-2xl font-bold text-skin-black sm:text-3xl xl:text-4xl">
        Invoices
      </h2>
      <p className="text-sm text-skin-baliHai md:hidden">
        {numInvoices} invoices
      </p>
      <p className="hidden text-sm text-skin-baliHai md:block">
        There are {numInvoices} total invoices
      </p>
    </div>
  );
}

export default InvoicesCount;
