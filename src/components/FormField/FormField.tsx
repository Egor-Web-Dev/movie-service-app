import styles from "./formField.module.scss";
import { FC } from "react";
import { Field } from "../Field";
import { useField, ErrorMessage } from "formik";
import type InputProps from "../../types/InputProps";

export const FormField: FC<InputProps> = (props) => {
  const [field, meta] = useField(props.name);

  const validationClassName = `${meta.error ? `${styles.error}` : ""}`;
  const className = `${props.className || ""} ${
    styles.formField
  } ${validationClassName}`.trim();

  return (
    <>
      <Field {...props} {...field} className={className} />

      <ErrorMessage
        className={styles.validationMessage}
        name={props.name!}
        component="div"
      />
    </>
  );
};
