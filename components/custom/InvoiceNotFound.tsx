import Link from "next/link";

function InvoiceNotFound({ invoiceId }: { invoiceId: string }) {
  return (
    <div className="mx-auto mt-12 w-full space-y-6 rounded-xl bg-skin-white px-12 py-14 text-center">
      <h1 className="mb-3 text-3xl text-skin-burntSienna">404 | Not Found</h1>
      <p className="text-skin-black">
        We&apos;re sorry, but we couldn&apos;t find an invoice matching this ID
        <span className="font-bold text-skin-selago">(#{invoiceId})</span>.
        It&apos;s possible the invoice may have been deleted or the ID entered
        is incorrect. Please check the ID again or return to the homepage to
        view all invoices.
      </p>

      <button className="btn-md mt-8 bg-skin-purple text-skin-white">
        <Link href="/app">Return Home</Link>
      </button>
    </div>
  );
}

export default InvoiceNotFound;
