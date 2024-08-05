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
import { ComponentPropsWithoutRef, PropsWithoutRef } from "react";

const filters = [
  {
    id: 1,
    name: "Draft",
    value: "draft",
  },
  {
    id: 2,
    name: "Pending",
    value: "pending",
  },
  {
    id: 3,
    name: "Paid",
    value: "paid",
  },
];

function Filter({ className }: ComponentPropsWithoutRef<"div">) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    // 1. add the filter to the search params
    if (params.get("status") === filter) {
      params.delete("status");
    } else {
      params.delete("page");
      params.set("status", filter);
    }

    // 2. update the URL with the new search params
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      className={`ml-auto flex items-center text-sm font-bold text-skin-black ${className}`}
    >
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

        <DropdownMenuContent className="mr-12 mt-2 flex w-48 flex-col gap-1 px-4 py-4 text-xs font-bold text-skin-black">
          {filters.map((filter) => (
            <DropdownMenuCheckboxItem
              key={filter.id}
              checked={searchParams.get("status") === filter.value}
              defaultChecked={searchParams.get("status") === filter.value}
              onCheckedChange={() => handleFilter(filter.value)}
            >
              <span className="ml-2">{filter.name}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Filter;
