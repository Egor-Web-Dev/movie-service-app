import { lazy } from "react";
import { createModalProvider } from "../../lib/ModalWindow/createModalProvider";

const AuthModal = lazy(() => import("../AuthModal"));
const TrailerModal = lazy(() => import("../TrailerModal"));
const SearchMovie = lazy(() => import("../SearchMovie"));

export const { ModalProvider, ModalContext } = createModalProvider({
  auth: { position: { x: "center", y: "center" }, component: AuthModal },
  trailer: { position: { x: "center", y: "center" }, component: TrailerModal },
  search: {
    position: { x: "center", y: "start" },
    component: SearchMovie,
  },
});
