"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import UserMenu from "./UserMenu";
import { logout } from "@/server/actions";
import toast from "react-hot-toast";
import { Skeleton } from "@/components/ui/skeleton";

function UserAvatar({ userImg }: { userImg: string }) {
  const [isActive, setIsActive] = useState(false);
  const [isPending, startTransition] = useTransition();

  const avatar = useRef(null);

  async function handleLogout() {
    startTransition(async () => {
      await logout();

      toast.success("Logged out succesfully");
    });
  }

  return (
    <div className="relative flex h-full items-center border-l-2 border-gray-500/50 px-8 xl:flex xl:w-full xl:justify-center xl:border-l-0 xl:border-t-2 xl:py-8">
      <UserMenu
        ref={avatar}
        isActive={isActive}
        setIsActive={setIsActive}
        handleLogout={handleLogout}
        isPending={isPending}
      />

      {isPending ? (
        <div>
          <Skeleton className="h-10 w-10 rounded-full bg-skin-purple" />
        </div>
      ) : (
        <Image
          ref={avatar}
          width={40}
          height={40}
          onClick={() => setIsActive(!isActive)}
          className="z-50 h-10 w-10 cursor-pointer rounded-full border-transparent transition-all duration-100 hover:scale-105 hover:border-4 hover:border-skin-purple"
          src={userImg}
          alt="user avatar"
        />
      )}
    </div>
  );
}

export default UserAvatar;
