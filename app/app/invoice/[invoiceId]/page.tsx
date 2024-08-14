import BackButton from "@/components/custom/BackButton";
import InvoiceInformation from "@/components/custom/InvoiceInformation";
import Loader from "@/components/custom/Loader";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: { invoiceId: string };
}) {
  return {
    title: `Invoice #${params.invoiceId}`,
  };
}

function Page({ params }: { params: { invoiceId: string } }) {
  const { invoiceId } = params;

  return (
    <div className="container mt-4 max-w-3xl px-4 py-6 md:py-0 xl:mt-0">
      <header>
        <BackButton />
      </header>

      <section className="mb-28 md:mb-4">
        <Suspense
          fallback={
            <div className="center-x absolute top-1/4 justify-center">
              <Loader />
            </div>
          }
        >
          <InvoiceInformation invoiceId={invoiceId} />
        </Suspense>
      </section>
    </div>
  );
}

export default Page;
