"use client";

import moonIcon from "@/public/assets/icon-moon.svg";
import sunIcon from "@/public/assets/icon-sun.svg";
import { useTheme } from "next-themes";
import Image from "next/image";

function DarkModeButton() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "light" ? (
        <Image width={24} height={24} src={sunIcon} alt={`sun icon`} />
      ) : (
        <Image width={24} height={24} src={moonIcon} alt={`moon icon`} />
      )}
    </button>
  );
}

export default DarkModeButton;
