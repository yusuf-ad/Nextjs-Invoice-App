import ButtonNewInvoice from "../_components/ButtonNewInvoice";
import Filter from "../_components/Filter";
import InvoicesCount from "../_components/InvoicesCount";
import Loader from "../_components/Loader";

function Loading() {
  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        <InvoicesCount numInvoices={0} />

        <Filter />
        <ButtonNewInvoice />
      </header>

      <div className="mt-12 flex justify-center">
        <Loader />
      </div>
    </div>
  );
}

export default Loading;
