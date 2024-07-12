import { formatPrice } from "@/lib/utils";
import TableItem from "./TableItem";
import { Item } from "@/lib/definitions/invoice";

function ItemsTable({ currentInvoice }: { currentInvoice: any }) {
  return (
    <div className="mt-12 overflow-hidden rounded-md shadow-sm">
      <div className="bg-skin-offWhite px-6 py-10 pb-6 dark:bg-skin-ebony">
        <table className="w-full">
          <thead className="hidden text-xs text-skin-baliHai md:table-header-group">
            <tr>
              <th className="pb-6 text-left">Item Name</th>
              <th className="pb-6 text-right">QTY.</th>
              <th className="pb-6 text-right">Price</th>
              <th className="pb-6 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {currentInvoice.items.map((item: Item, index: number) => (
              <TableItem key={index} item={item} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between bg-skin-gray px-6 py-6 text-white dark:bg-skin-vulcan">
        <p className="text-sm">Amount Due</p>
        <h2 className="text-xl font-bold">
          ${formatPrice(currentInvoice.total)}
        </h2>
      </div>
    </div>
  );
}

export default ItemsTable;
