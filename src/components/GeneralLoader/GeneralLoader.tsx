import styles from "./generalLoader.module.scss";
import { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const LOADER_DESKTOP_SIZE = 150;
const LOADER_MOBILE_SIZE = 100;

export const GeneralLoader = () => {
  const [size, setSize] = useState(LOADER_DESKTOP_SIZE);

  useEffect(() => {
    const newSize =
      window.outerWidth >= 768 ? LOADER_DESKTOP_SIZE : LOADER_MOBILE_SIZE;
    setSize(newSize);
  }, []);

  return (
    <div className={`${styles.generalLoader} flex`}>
      <MoonLoader size={size} color="#67a5eb" />
    </div>
  );
};
