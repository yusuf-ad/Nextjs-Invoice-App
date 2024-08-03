import ButtonNewInvoice from "@/components/custom/ButtonNewInvoice";
import Filter from "@/components/custom/Filter";
import InvoicesCount from "@/components/custom/InvoicesCount";
import Loader from "@/components/custom/Loader";

function loading() {
  return (
    <div className="container mt-4 max-w-3xl px-4 py-6 md:py-0 xl:mt-0">
      <header className="flex items-center justify-between gap-5">
        <div>
          <InvoicesCount numInvoices={0} />
          <Filter className="mt-4 sm:hidden" />
        </div>

        <Filter className="hidden sm:flex" />
        <ButtonNewInvoice />
      </header>

      <div className="flex items-center justify-center py-12">
        <Loader />
      </div>
    </div>
  );
}

export default loading;
