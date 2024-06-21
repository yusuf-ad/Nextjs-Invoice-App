"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import EditInvoiceForm from "./EditInvoiceForm";

function EditInvoiceModal({ currentInvoice }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="btn-sm cursor-pointer bg-skin-offWhite text-skin-baliHai hover:bg-gray-300 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70">
          Edit
        </div>
      </SheetTrigger>
      <SheetContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="top-20 w-full overflow-y-scroll bg-white pb-36 transition-all duration-300 dark:bg-skin-mirage2 sm:max-w-xl lg:max-w-3xl xl:top-0 xl:max-w-4xl xl:pl-36"
        side={"left"}
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-bold text-skin-black">
            Edit <span className="text-skin-shipCove">#</span>
            {currentInvoice?.invoiceId}
          </SheetTitle>
        </SheetHeader>

        <EditInvoiceForm currentInvoice={currentInvoice} />
      </SheetContent>
    </Sheet>
  );
}

export default EditInvoiceModal;
