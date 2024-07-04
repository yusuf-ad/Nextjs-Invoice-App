import SignupForm from "@/components/custom/SignupForm";

function Page() {
  return (
    <div className="center-xy container absolute top-1/4 max-w-xl px-4">
      <h1 className="mb-12 text-center text-2xl font-extrabold">
        Signup to Invoice App
      </h1>

      <SignupForm />
    </div>
  );
}

export default Page;
