import styles from "./button.module.scss";
import { MoonLoader } from "react-spinners";
import { FC, MouseEventHandler, ReactNode } from "react";

type Kind = "primary" | "secondary" | "default";
type Props = {
  className: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  kind: Kind;
  type?: "button" | "submit";
  isLoading?: boolean;
  title?: string;
};

export const Button: FC<Props> = ({
  children,
  className,
  onClick,
  kind,
  type = "button",
  isLoading = false,
  title,
}) => {
  return (
    <button
      className={`${className} ${getClassName(kind)} ${styles.btn} flex`}
      type={type}
      onClick={onClick}
      title={title}
    >
      {isLoading ? <MoonLoader size={24} color="#fff" /> : children}
    </button>
  );
};

const getClassName = (kind: Kind) => {
  switch (kind) {
    case "primary":
      return styles.primaryBtn;
    case "secondary":
      return styles.secondaryBtn;
    default:
      return styles.defaultBtn;
  }
};
