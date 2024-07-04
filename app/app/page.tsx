import InvoicesCount from "@/components/custom/InvoicesCount";
import Filter from "@/components/custom/Filter";
import InvoicesList from "@/components/custom/InvoicesList";
import { getInvoices } from "../../server/data-service";
import NewInvoiceModal from "@/components/custom/NewInvoiceModal";

type SearchParams = {
  searchParams: { paid?: string; draft?: string; pending?: string };
};

async function Page({ searchParams }: SearchParams) {
  const invoices = await getInvoices();

  // 1) get active filters
  const activeFilters = Object.entries(searchParams)
    .filter(([key, value]) => value === "true")
    .map(([key]) => key);

  // 2) filter invoices
  const filteredInvoices = invoices.filter((invoice) => {
    if (activeFilters.length === 0) return true;

    return activeFilters.includes(invoice.status);
  });

  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        <InvoicesCount numInvoices={filteredInvoices.length} />

        <Filter />
        <NewInvoiceModal />
      </header>

      <InvoicesList invoices={filteredInvoices} />
    </div>
  );
}

export default Page;
