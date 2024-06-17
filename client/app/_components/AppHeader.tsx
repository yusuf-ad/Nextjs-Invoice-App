import { verifySession } from "@/lib/auth/session";
import DarkModeButton from "./DarkModeButton";
import HeaderLogo from "./HeaderLogo";
import UserAvatar from "./UserAvatar";
import { hasAuth } from "@/lib/data-service";
import { useEffect } from "react";
import clsx from "clsx";

async function AppHeader() {
  const { status, message, userId } = await hasAuth();

  return (
    <header
      className={clsx(
        "top-0 z-50 flex h-20 w-full justify-between bg-skin-ebony xl:fixed xl:h-screen xl:max-w-28 xl:flex-col xl:rounded-r-3xl",
        {
          "pr-8 xl:pb-10 xl:pr-0": !userId,
        },
      )}
    >
      <HeaderLogo />

      <div className={`relative flex items-center gap-8 xl:flex-col xl:gap-8`}>
        <DarkModeButton />

        {userId && <UserAvatar />}
      </div>
    </header>
  );
}

export default AppHeader;
