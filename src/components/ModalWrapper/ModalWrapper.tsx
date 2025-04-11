import "./modalWrapper.scss";
import { Button } from "../Button";
import { ModalContext } from "../ModalProvider";
import IconClose from "../Icon/Close.svg?react";
import { ReactNode, useContext, FC } from "react";

const BLOCK_CLASS_NAME = "modal-wrapper";

type Props = {
  children: ReactNode;
};

export const ModalWrapper: FC<Props> = ({ children }) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <div className={`${BLOCK_CLASS_NAME} flex`}>
      {children}

      <Button
        className={`${BLOCK_CLASS_NAME}__close-btn`}
        kind="secondary"
        onClick={closeModal}
      >
        <IconClose />
      </Button>
    </div>
  );
};
