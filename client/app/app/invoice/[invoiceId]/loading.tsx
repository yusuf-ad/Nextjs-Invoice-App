import BackButton from "@/app/_components/BackButton";
import Loader from "../../../_components/Loader";

function Loading() {
  return (
    <div className="container mt-4 max-w-3xl xl:mt-0">
      <header>
        <BackButton />
      </header>

      <div className="center-x absolute top-1/4 justify-center">
        <Loader />
      </div>
    </div>
  );
}

export default Loading;
