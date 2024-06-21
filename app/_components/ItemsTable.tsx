// import TableItemRow from "./TableItemRow";

import { formatMoney } from "@/lib/utils";
import TableItem from "./TableItem";

function ItemsTable({ currentInvoice }) {
  return (
    <div className="mt-12 overflow-hidden rounded-md shadow-sm">
      <div className="bg-skin-offWhite px-6 py-10 pb-6 dark:bg-skin-ebony">
        <table className="w-full">
          <thead className="text-xs text-skin-baliHai">
            <tr>
              <th className="pb-6 text-left">Item Name</th>
              <th className="pb-6 text-right">QTY.</th>
              <th className="pb-6 text-right">Price</th>
              <th className="pb-6 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoice.items.map((item, index) => (
              <TableItem key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between bg-skin-gray px-6 py-6 text-white dark:bg-skin-vulcan">
        <p className="text-sm">Amount Due</p>
        <h2 className="text-xl font-bold">
          ${formatMoney(currentInvoice.total)}
        </h2>
      </div>
    </div>
  );
}

export default ItemsTable;
