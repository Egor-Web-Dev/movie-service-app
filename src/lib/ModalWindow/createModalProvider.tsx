import { Overlay } from "./Overlay";
import { GeneralLoader } from "../../components/GeneralLoader";
import { ReactNode, useState, createContext, useMemo, Suspense } from "react";
import type { Modals, ModalProviderProps, ModalContextProps } from "./types";

export const createModalProvider = <T extends Modals>(modals: T) => {
  type OpenModalFn = (name: keyof T, props?: ModalContextProps) => void;
  type ModalWindowHandler = {
    openModal: OpenModalFn;
    closeModal: () => void;
  };

  const ModalContext = createContext<ModalWindowHandler>(
    {} as ModalWindowHandler
  );

  const ModalProvider = ({ children }: ModalProviderProps) => {
    const [modal, setModal] = useState<ReactNode>(null);

    const closeModal = () => {
      document.body.classList.remove("no-scroll");
      setModal(null);
    };

    const openModal: OpenModalFn = (name, props?) => {
      const { position, component: Modal } = modals[name];
      document.body.classList.add("no-scroll");

      setModal(
        <Overlay position={position}>
          <Suspense fallback={<GeneralLoader />}>
            <Modal {...props} />
          </Suspense>
        </Overlay>
      );
    };

    const contextValue = useMemo(
      () => ({
        closeModal,
        openModal,
      }),
      []
    );

    return (
      <ModalContext.Provider value={contextValue}>
        {modal}
        {children}
      </ModalContext.Provider>
    );
  };

  return { ModalProvider, ModalContext };
};
