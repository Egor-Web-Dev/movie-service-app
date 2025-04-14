import styles from "./modalWrapper.module.scss";
import { Button } from "../Button";
import { ModalContext } from "../ModalProvider";
import IconClose from "../Icon/Close.svg?react";
import { ReactNode, useContext, FC } from "react";

type Props = {
  children: ReactNode;
};

export const ModalWrapper: FC<Props> = ({ children }) => {
  const { closeModal } = useContext(ModalContext);

  return (
    <div className={`${styles.modalWrapper} flex`}>
      {children}

      <Button
        className={styles.modalWrapper__closeBtn}
        kind="secondary"
        onClick={closeModal}
      >
        <IconClose />
      </Button>
    </div>
  );
};
