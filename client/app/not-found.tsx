import Link from "next/link";

function NotFound() {
  return (
    <div className="mx-auto mt-8 text-center">
      <h1 className="mb-2 text-3xl text-skin-burntSienna">404 Not Found</h1>
      <p>Could not find requested resource</p>

      <button className="btn-md mt-8 bg-skin-purple text-skin-white">
        <Link href="/">Return Home</Link>
      </button>
    </div>
  );
}

export default NotFound;
