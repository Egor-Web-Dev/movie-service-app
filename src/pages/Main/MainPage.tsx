import { Suspense } from "react";
import { Loader } from "../../components/Loader";
import { SectionTopMovies } from "../../components/SectionTopMovies";
import { SectionRandomMovie } from "../../components/SectionRandomMovie";

export const MainPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <SectionRandomMovie />
      <SectionTopMovies />
    </Suspense>
  );
};
