import InvoicesCount from "@/components/custom/InvoicesCount";
import Filter from "@/components/custom/Filter";
import InvoicesList from "@/components/custom/InvoicesList";
import { getInvoices } from "../../server/data-service";
import NewInvoiceModal from "@/components/custom/NewInvoiceModal";
import InvoicePagination from "@/components/custom/InvoicePagination";
import { DISPLAY_LIMIT } from "@/lib/utils";

type SearchParams = {
  searchParams: { status: string; page: number };
};

async function Page({ searchParams }: SearchParams) {
  const invoices = await getInvoices();

  const currentPage = searchParams.page || 1;
  const filter = searchParams.status || "all";

  // filter
  const filteredInvoices =
    filter !== "all"
      ? invoices.filter((invoice) => invoice.status === searchParams.status)
      : invoices;

  // pagination
  const totalPages = Math.ceil(filteredInvoices.length / DISPLAY_LIMIT);

  let paginatedInvoices = filteredInvoices;

  if (currentPage) {
    const start = (currentPage - 1) * DISPLAY_LIMIT;
    const end = start + DISPLAY_LIMIT;

    paginatedInvoices = filteredInvoices.slice(start, end);
  }

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
        <div className="justify-center">
          <InvoicesList invoices={paginatedInvoices} />

          {totalPages > 1 && <InvoicePagination totalPages={totalPages} />}
        </div>
      ) : (
        <p className="mt-16 text-xl">There is no invoices yet.</p>
      )}
    </div>
  );
}

export default Page;
