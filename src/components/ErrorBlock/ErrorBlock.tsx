import "./errorBlock.scss";
import { FC } from "react";

const BLOCK_CLASS_NAME = "error";

type Props = {
  text: string;
};

export const ErrorBlock: FC<Props> = ({ text }) => {
  return (
    <div className={`${BLOCK_CLASS_NAME} flex`}>
      <p className={`${BLOCK_CLASS_NAME}__message`}>{`${text}`}</p>
    </div>
  );
};
