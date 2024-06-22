"use client";

import moonIcon from "@/public/assets/icon-moon.svg";
import sunIcon from "@/public/assets/icon-sun.svg";
import { useTheme } from "next-themes";
import Image from "next/image";

function DarkModeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Image
        width={24}
        height={24}
        src={theme === "light" ? moonIcon : sunIcon}
        alt={theme === "light" ? "moon icon" : "sun icon"}
      />
    </button>
  );
}

export default DarkModeButton;
