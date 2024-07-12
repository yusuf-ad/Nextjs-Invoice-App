import ArrowLeft from "@/public/assets/icon-arrow-left.svg";
import Image from "next/image";
import Link from "next/link";

function BackButton() {
  return (
    <Link href={"/app"} className="group flex max-w-max items-center gap-4">
      <Image src={ArrowLeft} alt="Arrow left" />
      <span className="text-sm font-bold group-hover:text-skin-shipCove">
        Go back
      </span>
    </Link>
  );
}

export default BackButton;
