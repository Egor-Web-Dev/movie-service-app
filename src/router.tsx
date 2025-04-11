import App from "./App";
import { lazy } from "react";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router";

const Genres = lazy(() => import("./pages/Genres"));
const Account = lazy(() => import("./pages/Account"));
const MainPage = lazy(() => import("./pages/Main"));
const MoviesPage = lazy(() => import("./pages/Movies"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const FavoriteMovies = lazy(() => import("./components/FavoriteMovies"));
const AccountSettings = lazy(() => import("./components/AccountSettings"));

const routes = (
  <Route path="/" element={<App />}>
    <Route index element={<MainPage />} />

    <Route path="genres">
      <Route index element={<Genres />} />
      <Route path=":genre" element={<MoviesPage />} />
    </Route>

    <Route path="movie">
      <Route index element={<MoviesPage />} />
      <Route path=":movieId" element={<MovieDetails />} />
    </Route>

    <Route path="account" element={<Account />}>
      <Route index element={<FavoriteMovies />} />
      <Route path="settings" element={<AccountSettings />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Route>
);

const router = createBrowserRouter(createRoutesFromElements(routes));

export default router;
