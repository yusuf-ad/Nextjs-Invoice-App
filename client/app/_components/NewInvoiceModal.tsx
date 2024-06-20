"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonNewInvoice from "./ButtonNewInvoice";
import CreateInvoiceForm from "./CreateInvoiceForm";
import { useState } from "react";

function NewInvoiceModal() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <ButtonNewInvoice />
        </SheetTrigger>
        <SheetContent
          className="top-20 w-full overflow-y-scroll bg-white pb-36 transition-all duration-300 dark:bg-skin-mirage2 md:w-3/4 lg:max-w-3xl xl:top-0 xl:pl-36"
          side={"left"}
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold text-skin-black">
              New Invoice
            </SheetTitle>
          </SheetHeader>

          <CreateInvoiceForm closeModal={handleClose} />
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default NewInvoiceModal;
