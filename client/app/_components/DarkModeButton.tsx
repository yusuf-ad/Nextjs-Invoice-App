import moonIcon from "@/public/assets/icon-moon.svg";
import sunIcon from "@/public/assets/icon-sun.svg";
import Image from "next/image";

function DarkModeButton() {
  return (
    <button>
      <Image width={24} height={24} src={sunIcon} alt={`icon `} />
    </button>
  );
}

export default DarkModeButton;
