import { X } from "lucide-react";

function ButtonCloseModal() {
  return (
    <button className="absolute right-7 top-7 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
      <X className="h-7 w-7" />
      <span className="sr-only">Close</span>
    </button>
  );
}

export default ButtonCloseModal;
