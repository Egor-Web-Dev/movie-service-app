import styles from "./errorBlock.module.scss";
import { FC } from "react";

type Props = {
  text: string;
};

export const ErrorBlock: FC<Props> = ({ text }) => {
  return (
    <div className={`${styles.error} flex`}>
      <p>{text}</p>
    </div>
  );
};
