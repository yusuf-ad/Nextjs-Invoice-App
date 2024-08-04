import DarkModeButton from "./DarkModeButton";
import HeaderLogo from "./HeaderLogo";
import UserAvatar from "./UserAvatar";
import { getMyInfo, hasAuth } from "@/server/data-service";
import clsx from "clsx";
import ButtonLogout from "./ButtonLogout";

async function AppHeader() {
  const { userId } = await hasAuth();
  let profile = null;

  if (userId) {
    profile = await getMyInfo();

    if ("status" in profile) {
      return (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-75">
          <div className="rounded-lg bg-white p-8 text-center shadow-lg dark:bg-skin-mirage">
            <h1 className="text-2xl font-bold text-red-600">User not found!</h1>
            <p className="mb-10 mt-4 text-skin-black">
              The user you are looking for does not exist. Please logout and try
              again.
            </p>

            <ButtonLogout />
          </div>
        </div>
      );
    }
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

        {userId && <UserAvatar userImg={profile?.photo!} />}
      </div>
    </header>
  );
}

export default AppHeader;
