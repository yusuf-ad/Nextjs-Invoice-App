"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import UserMenu from "./UserMenu";

function UserAvatar() {
  const [isActive, setIsActive] = useState(false);

  const avatar = useRef(null);

  return (
    <div className="relative flex h-full items-center border-l-2 border-gray-500/50 px-8 xl:flex xl:w-full xl:justify-center xl:border-l-0 xl:border-t-2 xl:py-8">
      <UserMenu ref={avatar} isActive={isActive} setIsActive={setIsActive} />

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
