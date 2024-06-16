import InvoicesCount from "../_components/InvoicesCount";
import Filter from "../_components/Filter";
import ButtonNewInvoice from "../_components/ButtonNewInvoice";
import InvoicesList from "../_components/InvoicesList";
import { getInvoices } from "../../lib/data-service";

async function Page() {
  const invoices = await getInvoices();

  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        <InvoicesCount numInvoices={invoices.length} />

        <Filter />
        <ButtonNewInvoice />
      </header>

      <InvoicesList invoices={invoices} />
    </div>
  );
}

export default Page;
