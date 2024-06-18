"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import iconDown from "@/public/assets/icon-arrow-down.svg";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    // 1. add or remove the filter from the search params
    if (searchParams.has(filter)) {
      params.delete(filter);
    } else {
      params.set(filter, "true");
    }

    // 2. update the URL with the new search params
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="ml-auto flex items-center text-sm font-bold text-skin-black">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex select-none items-center">
            <button className="relative text-sm font-bold text-skin-black">
              Filter by status
            </button>
            <Image
              className={`transition-2 ml-3`}
              src={iconDown}
              alt="icon down"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-12 mt-2 w-48 space-y-1 p-5 text-xs font-bold text-skin-black">
          <DropdownMenuCheckboxItem
            checked={searchParams.get("draft") === "true"}
            defaultChecked={searchParams.get("draft") === "true"}
            onCheckedChange={() => handleFilter("draft")}
          >
            <span className="ml-2">Draft</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={searchParams.get("pending") === "true"}
            defaultChecked={searchParams.get("pending") === "true"}
            onCheckedChange={() => handleFilter("pending")}
          >
            <span className="ml-2">Pending</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={searchParams.get("paid") === "true"}
            defaultChecked={searchParams.get("paid") === "true"}
            onCheckedChange={() => handleFilter("paid")}
          >
            <span className="ml-2">Paid</span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Filter;
