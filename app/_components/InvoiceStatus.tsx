import { type InvoiceProps } from "./Invoice";

function InvoiceStatus({ status }: { status: InvoiceProps["status"] }) {
  const statusStyle = {
    paid: ["bg-skin-green/10 text-skin-green", "bg-skin-green"],
    pending: ["bg-skin-orange/10 text-skin-orange", "bg-skin-orange"],
    draft: [
      "bg-skin-gray/10 text-skin-gray dark:text-skin-offWhite",
      "bg-skin-gray dark:bg-skin-offWhite",
    ],
  };

  // Define a type for the keys of statusStyle
  type StatusKey = keyof typeof statusStyle;

  // Ensure status is a key of statusStyle
  const normalizedStatus = status.toLowerCase() as StatusKey;

  return (
    <p
      className={`min-w-28 rounded-md py-3 text-center text-xs font-bold ${statusStyle[
        normalizedStatus
      ].at(0)}`}
    >
      <span
        className={`mr-2 inline-block h-2 w-2 rounded-full ${statusStyle[
          normalizedStatus
        ].at(1)}`}
      ></span>
      {status[0].toUpperCase() + status.slice(1)}
    </p>
  );
}

export default InvoiceStatus;
