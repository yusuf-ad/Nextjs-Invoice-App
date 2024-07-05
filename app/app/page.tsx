import InvoicesCount from "@/components/custom/InvoicesCount";
import Filter from "@/components/custom/Filter";
import InvoicesList from "@/components/custom/InvoicesList";
import { getInvoices } from "../../server/data-service";
import NewInvoiceModal from "@/components/custom/NewInvoiceModal";

type SearchParams = {
  searchParams: { status: string };
};

async function Page({ searchParams }: SearchParams) {
  const invoices = await getInvoices();

  const filteredInvoices = searchParams.status
    ? invoices.filter((invoice) => invoice.status === searchParams.status)
    : invoices;

  return (
    <div className="container mt-4 max-w-3xl xs:px-4 xl:mt-0">
      <header className="flex items-center justify-between gap-5">
        <div>
          <InvoicesCount numInvoices={filteredInvoices.length} />
          <Filter className="mt-4 sm:hidden" />
        </div>

        <Filter className="hidden sm:flex" />
        <NewInvoiceModal />
      </header>

      {filteredInvoices.length > 0 ? (
        <InvoicesList invoices={filteredInvoices} />
      ) : (
        <p className="mt-16 text-xl">There is no invoice!</p>
      )}
    </div>
  );
}

export default Page;
