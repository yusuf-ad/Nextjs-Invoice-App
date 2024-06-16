"use client";

import { logout } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import Loader from "./Loader";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";

function UserAvatar() {
  const [isPending, startTransition] = useTransition();

  const [isActive, setIsActive] = useState(false);

  const logOutButton = useRef(null);
  const profileButton = useRef(null);
  const avatar = useRef(null);

  function handleLogout() {
    startTransition(async () => {
      await logout();

      toast.success("Logged out succesfully");
    });
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileButton.current &&
        !profileButton.current?.contains(event.target) &&
        logOutButton.current &&
        !logOutButton.current?.contains(event.target) &&
        !avatar.current?.contains(event.target)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex h-full items-center border-l-2 border-gray-500/50 px-8 xl:flex xl:w-full xl:justify-center xl:border-l-0 xl:border-t-2 xl:py-8">
      <div
        className={`${
          isActive
            ? "pointer-events-auto translate-y-8 opacity-100 xl:translate-x-8"
            : "pointer-events-none -translate-y-0 opacity-0 xl:-translate-x-0"
        } absolute right-5 top-[40px] z-30 flex w-40 flex-col overflow-hidden rounded-md bg-white px-3 text-sm font-bold transition-all duration-200 dark:bg-skin-mirage xl:-right-32 xl:-top-5 xl:translate-y-0`}
      >
        <button
          className="border-b-[1px] border-b-gray-400 py-4 text-center hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={profileButton}
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          Profile
        </button>
        <button
          className="py-4 hover:underline hover:decoration-skin-purple hover:decoration-1 hover:underline-offset-4"
          ref={logOutButton}
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
      <Image
        ref={avatar}
        width={40}
        height={40}
        onClick={() => setIsActive(!isActive)}
        className="z-50 h-10 w-10 cursor-pointer rounded-full border-transparent transition-all duration-100 hover:scale-105 hover:border-4 hover:border-skin-purple"
        src={
          "https://avatars.mds.yandex.net/i?id=330af41273106bca8572b59d7b643c611d32d2ee-12496338-images-thumbs&n=13"
        }
        alt="user avatar"
      />
    </div>
  );
}

export default UserAvatar;
