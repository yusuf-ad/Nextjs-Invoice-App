import { Item } from "@/lib/definitions/invoice";

function TableItem({ item }: { item: Item }) {
  return (
    <>
      {/* desktop */}
      <tr className="hidden text-sm font-bold md:table-row">
        <td className="pb-4 capitalize text-skin-black">{item.name}</td>
        <td className="pb-4 text-right text-skin-baliHai">{item.qty} </td>
        <td className="pb-4 text-right text-skin-baliHai">
          ${item.price.toFixed(2)}
        </td>
        <td className="pb-4 text-right text-skin-black">
          ${item.totalPrice.toFixed(2)}
        </td>
      </tr>

      {/* mobile */}
      <tr className="text-sm font-bold md:hidden">
        <td className="pb-4 capitalize text-skin-black">
          <div>
            {item.name}
            <p className="mt-2 lowercase text-skin-shipCove">
              {item.qty} x ${item.price.toFixed(2)}
            </p>
          </div>
        </td>

        <td className="pb-4 text-right text-skin-black">
          ${item.totalPrice.toFixed(2)}
        </td>
      </tr>
    </>
  );
}

export default TableItem;
