import "./field.scss";
import { FC } from "react";
import type InputProps from "../../types/InputProps";

const FIELD_CLASS_NAME = "field";

export const Field: FC<InputProps> = (props) => {
  return (
    <div className={`${props.className} ${FIELD_CLASS_NAME} flex`}>
      <label className={`${FIELD_CLASS_NAME}__label flex`} htmlFor={props.id}>
        {props.icon}
      </label>

      <input {...props} className={`${FIELD_CLASS_NAME}__input`} />
    </div>
  );
};
