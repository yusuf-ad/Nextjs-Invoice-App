import Image from "next/image";

import plusIcon from "@/public/assets/icon-plus.svg";
import iconDown from "@/public/assets/icon-arrow-down.svg";

function Page() {
  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header className="flex items-center gap-5">
        {/* invoicescount */}
        <div className="space-y-2 xl:space-y-3">
          <h2 className="text-3xl font-bold text-skin-black xl:text-4xl">
            Invoices
          </h2>
          <p className="text-sm text-skin-baliHai md:hidden">0 invoices</p>
          <p className="hidden text-sm text-skin-baliHai md:block">
            There are 0 total invoices
          </p>
        </div>

        <div className="ml-auto flex items-center">
          <button className="relative text-sm font-bold text-skin-black">
            Filter by status
          </button>

          <Image
            className={`transition-2 ml-2`}
            src={iconDown}
            alt="icon down"
          />
        </div>

        {/* buttonnewinvoice */}
        <button className="flex items-center rounded-full bg-skin-purple px-3 py-2 text-sm font-bold tracking-wider text-white transition-opacity duration-300 hover:opacity-75">
          <div className="relative rounded-full bg-white p-4">
            <Image
              src={plusIcon}
              className="center-xy absolute ml-[1px] h-3 w-3"
              alt="icon plus"
            />
          </div>
          <span className="ml-3 mr-1">New</span>
          <span className="hidden md:inline-block">Invoice</span>
        </button>
      </header>
    </div>
  );
}

export default Page;
