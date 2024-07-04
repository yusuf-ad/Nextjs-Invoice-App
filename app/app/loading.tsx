import ButtonNewInvoice from "@/components/custom/ButtonNewInvoice";
import Filter from "@/components/custom/Filter";
import InvoicesCount from "@/components/custom/InvoicesCount";
import Loader from "@/components/custom/Loader";

function loading() {
  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        <InvoicesCount numInvoices={0} />

        <Filter />
        <ButtonNewInvoice />
      </header>

      <div className="flex w-full items-center justify-center p-10">
        <Loader />
      </div>
    </div>
  );
}

export default loading;
