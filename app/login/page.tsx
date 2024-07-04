import LoginForm from "@/components/custom/LoginForm";

function Page() {
  return (
    <div className="center-x container absolute top-1/4 max-w-lg px-4">
      <h1 className="mb-16 text-center text-2xl font-extrabold">
        Login to Invoice App
      </h1>

      <LoginForm />
    </div>
  );
}

export default Page;
