import "./loader.scss";
import { PulseLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className="section-loader flex">
      <PulseLoader size={25} color="#27a7e7" />
    </div>
  );
};
