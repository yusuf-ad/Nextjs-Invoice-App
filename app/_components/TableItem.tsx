import { formatMoney } from "@/lib/utils";

function TableItem({ item }) {
  return (
    <tr className="text-sm font-bold">
      <td className="pb-4 capitalize text-skin-black">{item.name}</td>
      <td className="pb-4 text-right text-skin-baliHai">{item.qty} </td>
      <td className="pb-4 text-right text-skin-baliHai">
        ${formatMoney(item.price)}
      </td>
      <td className="pb-4 text-right text-skin-black">
        ${formatMoney(item.totalPrice)}
      </td>
    </tr>
  );
}

export default TableItem;
