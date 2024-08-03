import InvoicesCount from "@/components/custom/InvoicesCount";
import Filter from "@/components/custom/Filter";
import InvoicesList from "@/components/custom/InvoicesList";
import { getInvoices } from "../../server/data-service";
import NewInvoiceModal from "@/components/custom/NewInvoiceModal";
import InvoicePagination from "@/components/custom/InvoicePagination";

type SearchParams = {
  searchParams: { status: string };
};

async function Page({ searchParams }: SearchParams) {
  const invoices = await getInvoices();

  const filteredInvoices = searchParams.status
    ? invoices.filter((invoice) => invoice.status === searchParams.status)
    : invoices;

  return (
    <div className="container mt-4 max-w-3xl px-4 py-6 md:py-0 xl:mt-0">
      <header className="flex items-center justify-between gap-5">
        <div>
          <InvoicesCount numInvoices={filteredInvoices.length} />
          <Filter className="mt-4 sm:hidden" />
        </div>

        <Filter className="hidden sm:flex" />
        <NewInvoiceModal />
      </header>

      {filteredInvoices.length > 0 ? (
        <>
          <InvoicesList invoices={filteredInvoices.slice(0, 5)} />

          {filteredInvoices.length > 5 && <InvoicePagination />}
        </>
      ) : (
        <p className="mt-16 text-xl">There is no invoices yet.</p>
      )}
    </div>
  );
}

export default Page;
