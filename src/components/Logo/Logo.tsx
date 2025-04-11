import { FC } from "react";
import logoWhite from "../../assets/images/logo-white.webp";
import logoBlack from "../../assets/images/logo-black.webp";

type Props = {
  isBlack?: boolean;
};

export const Logo: FC<Props> = ({ isBlack = false }) => {
  const source = isBlack ? logoBlack : logoWhite;

  return (
    <div className="logo flex">
      <img src={source} alt="Логотип" />
    </div>
  );
};
