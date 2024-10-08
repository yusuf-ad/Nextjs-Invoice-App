"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteInvoice } from "@/server/actions";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";

function DeleteInvoiceButton({ invoiceId }: { invoiceId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClose = () => setIsOpen(false);

  function handleDelete() {
    startTransition(() => {
      deleteInvoice(invoiceId);

      toast.success("Invoice deleted successfully");
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70">
          Delete
        </div>
      </DialogTrigger>
      <DialogContent className="w-3/4 max-w-xl p-10">
        <DialogTitle className="text-3xl font-bold tracking-wide text-skin-black sm:text-4xl">
          Confirm Deletion
        </DialogTitle>
        <DialogDescription className="text-sm leading-6 text-skin-baliHai">
          Are you sure you want to delete invoice{" "}
          <span className="text-xs">#</span>
          <span className="text-base">{invoiceId}?</span> This action cannot be
          undone.
        </DialogDescription>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            type="button"
            className="btn-sm bg-skin-gray font-bold text-white hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-skin-gray dark:hover:bg-skin-gray dark:hover:opacity-70"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            type="submit"
            className="btn-sm bg-skin-burntSienna text-skin-offWhite hover:opacity-70"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteInvoiceButton;
