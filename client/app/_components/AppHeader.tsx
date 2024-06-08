import DarkModeButton from "./DarkModeButton";
import HeaderLogo from "./HeaderLogo";
import UserAvatar from "./UserAvatar";

function AppHeader() {
  return (
    <header className="top-0 z-50 flex h-20 w-full justify-between bg-skin-ebony xl:fixed xl:h-screen xl:max-w-28 xl:flex-col xl:rounded-r-3xl">
      <HeaderLogo />

      <div className={`relative flex items-center gap-8 xl:flex-col xl:gap-8`}>
        <DarkModeButton />

        <UserAvatar />
      </div>
    </header>
  );
}

export default AppHeader;
