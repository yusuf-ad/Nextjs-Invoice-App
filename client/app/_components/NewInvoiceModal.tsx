import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonNewInvoice from "./ButtonNewInvoice";
import CreateInvoiceForm from "./CreateInvoiceForm";

function NewInvoiceModal() {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <ButtonNewInvoice />
        </SheetTrigger>
        <SheetContent
          className="top-20 w-full overflow-y-scroll bg-white transition-all duration-300 dark:bg-skin-mirage2 md:w-3/4 lg:max-w-3xl xl:top-0 xl:pl-28"
          side={"left"}
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-skin-black">
              New Invoice
            </SheetTitle>
          </SheetHeader>

          <CreateInvoiceForm />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NewInvoiceModal;
