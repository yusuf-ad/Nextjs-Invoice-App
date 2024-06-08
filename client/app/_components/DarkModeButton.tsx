import moonIcon from "@/public/assets/icon-moon.svg";
import sunIcon from "@/public/assets/icon-sun.svg";

function DarkModeButton() {
  return (
    <button>
      <img src={sunIcon} alt={`icon `} />
    </button>
  );
}

export default DarkModeButton;
