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

  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        <InvoicesCount numInvoices={invoices.length} />

        <Filter />
        <NewInvoiceModal />
      </header>

      {invoices.length > 0 ? (
        <InvoicesList invoices={invoices} />
      ) : (
        <p className="mt-16 text-xl">There is no invoice!</p>
      )}
    </div>
  );
}

export default Page;
