import Loader from "@/components/custom/Loader";

function loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader />
    </div>
  );
}

export default loading;
