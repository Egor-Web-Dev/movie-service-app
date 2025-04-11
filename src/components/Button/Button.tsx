import "./button.scss";
import { MoonLoader } from "react-spinners";
import { FC, MouseEventHandler, ReactNode } from "react";

type Props = {
  className: string;
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  kind: "primary" | "secondary" | "default";
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
      className={`${className} ${kind}-btn btn flex`}
      type={type}
      onClick={onClick}
      title={title}
    >
      {isLoading ? <MoonLoader size={24} color="#fff" /> : children}
    </button>
  );
};
