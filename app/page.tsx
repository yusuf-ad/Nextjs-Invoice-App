import Link from "next/link";

function Page() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-8 rounded-xl bg-white px-12 py-14 shadow-sm dark:bg-skin-mirage">
      <h1 className="text-center text-2xl font-bold text-skin-black">
        Welcome to the Invoice App
      </h1>

      <div className="flex flex-col justify-around gap-4 md:flex-row">
        <Link href={"/login"}>
          <button className="btn-md w-full bg-skin-purple">Log in</button>
        </Link>
        <Link href={"/signup"}>
          <button className="btn-md w-full bg-skin-orange">Sign up</button>
        </Link>
      </div>
    </div>
  );
}

export default Page;
