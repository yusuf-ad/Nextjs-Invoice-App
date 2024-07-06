import { Item } from "@/lib/definitions/invoice";

function TableItem({ item }: { item: Item }) {
  return (
    <tr className="text-sm font-bold">
      <td className="pb-4 capitalize text-skin-black">{item.name}</td>
      <td className="pb-4 text-right text-skin-baliHai">{item.qty} </td>
      <td className="pb-4 text-right text-skin-baliHai">
        ${item.price.toFixed(2)}
      </td>
      <td className="pb-4 text-right text-skin-black">
        ${item.totalPrice.toFixed(2)}
      </td>
    </tr>
  );
}

export default TableItem;
