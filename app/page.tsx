import Link from "next/link";

function Page() {
  return (
    <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-xl bg-white px-8 py-12 shadow-sm dark:bg-skin-mirage sm:w-2/3">
      <h1 className="text-center text-2xl font-bold text-skin-black">
        Welcome to the Invoice App
      </h1>

      <p className="text-center text-skin-vulcan dark:text-skin-selago">
        This is a portfolio project developed from a{" "}
        <a
          target="blank"
          className="transition-1 text-skin-heliotrope hover:underline"
          href="https://www.frontendmentor.io/challenges/invoice-app-i7KaLTQjl"
        >
          Front End Mentor challenge
        </a>{" "}
        by{" "}
        <a
          target="blank"
          className="transition-1 text-skin-heliotrope hover:underline"
          href="https://github.com/yusuf-ad/Nextjs-Invoice-App"
        >
          Yusuf Ad
        </a>
      </p>

      <div className="flex flex-col justify-around gap-4 px-0 text-skin-offWhite xs:px-8 md:flex-row">
        <Link
          className="btn-md flex w-full items-center justify-center bg-skin-purple"
          href={"/login"}
        >
          Log in
        </Link>
        <Link
          className="btn-md flex w-full items-center justify-center bg-skin-orange"
          href={"/signup"}
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}

export default Page;
