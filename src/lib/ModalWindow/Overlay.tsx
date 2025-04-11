import "./overlay.scss";
import type { OverlayProps } from "./types";
import { FC, useContext, useEffect, useRef } from "react";
import { ModalContext } from "../../components/ModalProvider";

const CLASS_NAME = "overlay";

export const Overlay: FC<OverlayProps> = ({ position, children }) => {
  const { closeModal } = useContext(ModalContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = ref.current;

    const handleCloseModalClick = (e: MouseEvent) => {
      if (e.target === overlay) closeModal();
    };

    const handleCloseModalKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    overlay?.addEventListener("click", handleCloseModalClick);
    document.addEventListener("keydown", handleCloseModalKeydown);

    return () => {
      overlay?.removeEventListener("click", handleCloseModalClick);
      document.removeEventListener("keydown", handleCloseModalKeydown);
    };
  });

  return (
    <div
      className={`${CLASS_NAME} flex horizontal-${position.x} vertical-${position.y}`}
      ref={ref}
    >
      {children}
    </div>
  );
};
