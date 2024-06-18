"use client";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

import iconDown from "@/public/assets/icon-arrow-down.svg";
import Image from "next/image";
import { useState } from "react";

function Filter() {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

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
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            <span className="ml-2">Draft</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
          >
            <span className="ml-2">Pending</span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            <span className="ml-2">Paid</span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Filter;
