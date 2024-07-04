import "@/styles/loader.css";

type LoaderProps = {
  type?: string;
};

function Loader({ type }: LoaderProps) {
  return (
    <div className={`lds-ring ${type}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
