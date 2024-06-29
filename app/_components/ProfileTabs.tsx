"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function ProfileTabs() {
  const pathname = usePathname();

  const activeTab = pathname === "/profile" ? "Account" : "Password";

  return (
    <div className="relative flex h-10 max-w-max items-center overflow-hidden rounded-md border-2 border-skin-black font-semibold">
      <Link
        href="/profile"
        className={`${activeTab === "Account" ? "text-white" : ""} z-20 flex h-full cursor-pointer items-center border-r-2 border-gray-500 px-3`}
      >
        Account
      </Link>
      <div
        className={`${activeTab === "Account" ? "w-[88.56px] translate-x-0" : "w-[98.25px] translate-x-[78px]"} transition-3 absolute z-0 h-full bg-skin-purple ease-in`}
      ></div>
      <Link
        href="/profile/password"
        className={`${activeTab === "Password" ? "text-white" : ""} z-20 flex h-full cursor-pointer items-center border-r-2 border-gray-500 px-3`}
      >
        Password
      </Link>
    </div>
  );
}

export default ProfileTabs;
