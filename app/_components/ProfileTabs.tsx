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
        className={`${activeTab === "Account" ? "text-white" : ""} z-20 flex h-full w-28 cursor-pointer items-center justify-center border-r-2 border-gray-500 px-3 text-center`}
      >
        Account
      </Link>
      <div
        className={`${activeTab === "Account" ? "w-28 translate-x-0" : "w-28 translate-x-28"} transition-3 absolute z-0 h-full bg-skin-purple ease-in`}
      ></div>
      <Link
        href="/profile/password"
        className={`${activeTab === "Password" ? "text-white" : ""} z-20 flex h-full w-28 cursor-pointer items-center justify-center border-r-2 border-gray-500 px-3`}
      >
        Password
      </Link>
    </div>
  );
}

export default ProfileTabs;
