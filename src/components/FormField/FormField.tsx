import "./formField.scss";
import { FC } from "react";
import { Field } from "../Field";
import { useField, ErrorMessage } from "formik";
import type InputProps from "../../types/InputProps";

export const FormField: FC<InputProps> = (props) => {
  const [field, meta] = useField(props.name);
  const validationClassName = `${meta.error ? "form-field--error" : ""}`.trim();

  return (
    <>
      <Field
        {...props}
        {...field}
        className={`${props.className} form-field ${validationClassName}`}
      />
      <ErrorMessage
        className="validation-message"
        name={props.name!}
        component="div"
      />
    </>
  );
};
