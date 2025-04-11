import "./generalLoader.scss";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

export const GeneralLoader = () => {
  const [size, setSize] = useState(150);

  useEffect(() => {
    const newSize = window.outerWidth >= 768 ? 150 : 100;
    setSize(newSize);
  }, []);

  return (
    <div className="general-loader flex">
      <MoonLoader size={size} color="#67a5eb" />
    </div>
  );
};
