import Link from "next/link";
import Image from "next/image";

import appIcon from "@/public/assets/logo.svg";

function HeaderLogo() {
  return (
    <Link href={"/app"}>
      <div className="group relative h-full w-20 cursor-pointer overflow-hidden rounded-r-3xl bg-skin-purple xl:h-28 xl:w-full">
        <div className="absolute bottom-0 h-1/2 w-full rounded-tl-3xl bg-skin-heliotrope transition-all duration-300 group-hover:h-[85%]"></div>
        <Image
          className="absolute left-1/2 top-1/2 z-10 h-9 w-9 -translate-x-1/2 -translate-y-1/2"
          src={appIcon}
          alt="invoice app logo"
        />
      </div>
    </Link>
  );
}

export default HeaderLogo;
