import { FC, ReactNode } from "react";
import { Container } from "../Container";

type Props = {
  className: string;
  children: ReactNode;
  optionalClassName?: string;
};

export const Section: FC<Props> = ({
  className,
  children,
  optionalClassName = "",
}) => {
  return (
    <section
      className={`${className} section flex ${optionalClassName}`.trim()}
    >
      <Container sectionClassName={className}>{children}</Container>
    </section>
  );
};
