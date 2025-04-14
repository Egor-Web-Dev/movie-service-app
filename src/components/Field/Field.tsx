import styles from "./field.module.scss";
import { FC } from "react";
import type InputProps from "../../types/InputProps";

export const Field: FC<InputProps> = (props) => {
  return (
    <div className={`${props.className} ${styles.field} flex`}>
      <label className={`${styles.field__label} flex`} htmlFor={props.id}>
        {props.icon}
      </label>

      <input {...{ ...props, icon: null }} className={styles.field__input} />
    </div>
  );
};
