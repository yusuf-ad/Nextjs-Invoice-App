import SignupForm from "@/components/custom/SignupForm";

function Page() {
  return (
    <div className="container top-1/4 flex min-h-max max-w-xl flex-col items-center justify-center px-4 py-12">
      <h1 className="mb-6 text-center text-2xl font-extrabold">
        Signup to Invoice App
      </h1>

      <SignupForm />
    </div>
  );
}

export default Page;
