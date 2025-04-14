import styles from "./loader.module.scss";
import { PulseLoader } from "react-spinners";

export const Loader = () => {
  return (
    <div className={`${styles.sectionLoader} flex`}>
      <PulseLoader size={25} color="#27a7e7" />
    </div>
  );
};
