import DarkModeButton from "./DarkModeButton";
import HeaderLogo from "./HeaderLogo";
import UserAvatar from "./UserAvatar";
import { getMyInfo, hasAuth } from "@/server/data-service";
import clsx from "clsx";

async function AppHeader() {
  const { userId } = await hasAuth();
  let profile = null;

  if (userId) {
    profile = await getMyInfo();
  }

  return (
    <header
      className={clsx(
        "sticky inset-0 top-0 z-50 flex h-20 w-full justify-between bg-skin-ebony xl:fixed xl:h-screen xl:max-w-28 xl:flex-col xl:rounded-r-3xl",
        {
          "pr-8 xl:pb-10 xl:pr-0": !userId,
        },
      )}
    >
      <HeaderLogo />

      <div className={`relative flex items-center gap-8 xl:flex-col xl:gap-8`}>
        <DarkModeButton />

        {userId && <UserAvatar userImg={profile?.photo} />}
      </div>
    </header>
  );
}

export default AppHeader;
