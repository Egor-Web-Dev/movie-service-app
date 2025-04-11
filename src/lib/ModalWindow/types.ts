/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, FC, ComponentType } from "react";

export type Level = "start" | "center" | "end";
export type Position = { x: Level; y: Level };

export type ModalProviderProps = {
  children: ReactNode;
};

export type Modals = {
  [key: string]: {
    position: Position;
    component: FC<any> | ComponentType<any>;
  };
};

export type ModalContextProps = {
  [key: string]: object | string | number;
};

export type OverlayProps = {
  position: Position;
  children: ReactNode;
};
