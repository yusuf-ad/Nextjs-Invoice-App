import iconDown from "@/public/assets/icon-arrow-down.svg";
import Image from "next/image";

function Filter() {
  return (
    <div className="ml-auto flex items-center">
      <button className="relative text-sm font-bold text-skin-black">
        Filter by status
      </button>

      <Image className={`transition-2 ml-2`} src={iconDown} alt="icon down" />
    </div>
  );
}

export default Filter;
