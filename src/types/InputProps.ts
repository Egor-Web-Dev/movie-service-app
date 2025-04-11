import { ReactNode } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className: string;
  icon: ReactNode;
  type?: "text" | "password" | "number" | "email" | "search";
}

export default InputProps;
