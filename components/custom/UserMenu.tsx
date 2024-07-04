"use client";

import { forwardRef, useEffect, useRef } from "react";
import { User, LogOut } from "lucide-react";
import Link from "next/link";

const UserMenu = forwardRef(
  (
    {
      isActive,
      setIsActive,
      handleLogout,
      isPending,
    }: {
      isActive: boolean;
      setIsActive: (isOpen: boolean) => void;
      handleLogout: () => void;
      isPending: boolean;
    },
    ref,
  ) => {
    const logOutButton = useRef<HTMLButtonElement>(null);
    const profileButton = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (
          profileButton.current &&
          !profileButton.current?.contains(event.target as Node) &&
          logOutButton.current &&
          !logOutButton.current?.contains(event.target as Node) &&
          !ref.current?.contains(event.target as Node)
        ) {
          setIsActive(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [setIsActive, ref]);

    return (
      <div
        className={`${
          isActive
            ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
            : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
        } absolute right-5 top-[40px] z-30 flex w-40 flex-col overflow-hidden rounded-md bg-white px-3 text-sm font-bold transition-all duration-200 dark:bg-skin-mirage xl:-right-32 xl:-top-5 xl:translate-y-0`}
      >
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={profileButton}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <button
          className="flex items-center justify-center gap-2 py-4 hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={logOutButton}
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {isPending ? "Logging out..." : "Log out"}
        </button>
      </div>
    );
  },
);

UserMenu.displayName = "UserMenu";

export default UserMenu;
