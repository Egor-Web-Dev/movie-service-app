import "./container.scss";
import { FC, ReactNode } from "react";

export { Container };

type Props = {
  sectionClassName: string;
  children: ReactNode;
};

const Container: FC<Props> = ({ sectionClassName, children }) => {
  return (
    <div className="container">
      <div className={`${sectionClassName}__content flex`}>{children}</div>
    </div>
  );
};
