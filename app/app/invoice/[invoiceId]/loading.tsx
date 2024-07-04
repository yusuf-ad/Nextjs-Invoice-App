import BackButton from "@/components/custom/BackButton";

function loading() {
  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header>
        <BackButton />
      </header>

      <section className="mb-20 md:mb-4">loading...</section>
    </div>
  );
}

export default loading;
