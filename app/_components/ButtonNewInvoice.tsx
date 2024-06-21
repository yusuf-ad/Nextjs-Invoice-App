import plusIcon from "@/public/assets/icon-plus.svg";
import Image from "next/image";

function ButtonNewInvoice() {
  return (
    <div className="flex select-none items-center rounded-full bg-skin-purple px-3 py-2 text-sm font-bold tracking-wider text-white transition-opacity duration-300 hover:opacity-75">
      <div className="relative rounded-full bg-white p-4">
        <Image
          src={plusIcon}
          className="center-xy absolute ml-[1px] h-3 w-3"
          alt="icon plus"
        />
      </div>
      <span className="ml-3 mr-1">New</span>
      <span className="hidden md:inline-block">Invoice</span>
    </div>
  );
}

export default ButtonNewInvoice;
