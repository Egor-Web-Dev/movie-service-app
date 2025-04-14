import styles from "./container.module.scss";
import { FC, ReactNode } from "react";

type Props = {
  contentClassName: string;
  children: ReactNode;
};

export const Container: FC<Props> = ({ contentClassName, children }) => {
  return (
    <div className={styles.container}>
      <div className={`${contentClassName} flex`}>{children}</div>
    </div>
  );
};
