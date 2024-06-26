"use client";

import { markAsPaid } from "@/server/actions";
import { useTransition } from "react";
import toast from "react-hot-toast";

function ButtonMarkAsPaid({ invoiceId }: { invoiceId: string }) {
  const [isPending, startTransition] = useTransition();

  function handleMarkAsPaid() {
    startTransition(() => {
      markAsPaid(invoiceId);

      toast.success("Invoice marked as paid");
    });
  }

  return (
    <button
      onClick={handleMarkAsPaid}
      className="btn-sm min-w-max bg-skin-purple text-white transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isPending ? "Marking as Paid" : "Mark as Paid"}
    </button>
  );
}

export default ButtonMarkAsPaid;
