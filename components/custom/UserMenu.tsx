"use client";

import { forwardRef, useEffect, useRef, MutableRefObject } from "react";
import { User, LogOut, GithubIcon } from "lucide-react";
import Link from "next/link";

interface UserMenuProps {
  isActive: boolean;
  setIsActive: (isOpen: boolean) => void;
  handleLogout: () => void;
  isPending: boolean;
}

const UserMenu = forwardRef<HTMLDivElement, UserMenuProps>(
  ({ isActive, setIsActive, handleLogout, isPending }, ref) => {
    const logOutButtonRef = useRef<HTMLButtonElement>(null);
    const profileButtonRef = useRef<HTMLAnchorElement>(null);
    const githubButtonRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          profileButtonRef.current?.contains(event.target as Node) ||
          logOutButtonRef.current?.contains(event.target as Node) ||
          (ref as MutableRefObject<HTMLDivElement | null>).current?.contains(
            event.target as Node,
          )
        ) {
          return;
        }
        setIsActive(false);
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsActive, ref]);

    return (
      <div
        ref={ref}
        className={`absolute right-5 top-[40px] z-30 flex w-40 flex-col overflow-hidden rounded-md bg-white px-3 text-sm font-bold transition-all duration-200 dark:bg-skin-mirage xl:-right-28 xl:-top-20 xl:translate-y-0 ${
          isActive
            ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
            : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
        }`}
      >
        <a
          target="_blank"
          href="https://github.com/yusuf-ad/Nextjs-Invoice-App"
          className="flex items-center justify-center gap-2 border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={githubButtonRef}
          onClick={() => setIsActive(!isActive)}
        >
          <GithubIcon className="h-4 w-4" />
          Github repo
        </a>
        <Link
          href="/profile"
          className="flex items-center justify-center gap-2 border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={profileButtonRef}
          onClick={() => setIsActive(!isActive)}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <button
          className="flex items-center justify-center gap-2 py-4 hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={logOutButtonRef}
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
