import "./styles/index.scss";
import fetchMe from "./api/fetchMe";
import { Outlet } from "react-router";
import { store } from "./store/store";
import { Suspense, useEffect } from "react";
import { setUser } from "./store/userSlice";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorBlock } from "./components/ErrorBlock";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ModalProvider } from "./components/ModalProvider";
import { ScrollUpButton } from "./components/ScrollUpButton";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import { GeneralLoader } from "./components/GeneralLoader/GeneralLoader";

const ERROR_TEXT = "Ошибка загрузки приложения! Попробуйте позже";

const App = () => {
  const query = useSuspenseQuery({
    queryFn: fetchMe,
    queryKey: ["fetch", "me"],
    retry: 0,
  });

  useEffect(() => {
    store.dispatch(setUser(query.data || null));
  });

  return (
    <ModalProvider>
      <Header />

      <ErrorBoundary fallback={<ErrorBlock text={ERROR_TEXT} />}>
        <Suspense fallback={<GeneralLoader />}>
          <main className="main">
            <Outlet />
          </main>
        </Suspense>
      </ErrorBoundary>

      <Footer />

      <ScrollUpButton />
    </ModalProvider>
  );
};

export default App;
