import "./genresPage.scss";
import { Suspense } from "react";
import { Loader } from "../../components/Loader";
import { Section } from "../../components/Section";
import { GenresList } from "../../components/GenresList";

const PAGE_CLASS_NAME = "genres";

export const GenresPage = () => {
  return (
    <Section
      className={PAGE_CLASS_NAME}
      optionalClassName="section-padding-block"
    >
      <h1 className={`${PAGE_CLASS_NAME}__title heading-1`}>Жанры фильмов</h1>

      <Suspense fallback={<Loader />}>
        <GenresList />
      </Suspense>
    </Section>
  );
};
