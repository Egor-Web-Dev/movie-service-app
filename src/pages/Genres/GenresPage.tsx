import styles from "./genresPage.module.scss";
import { Suspense } from "react";
import { Loader } from "../../components/Loader";
import { Container } from "../../components/Container";
import { GenresList } from "../../components/GenresList";

export const GenresPage = () => {
  return (
    <section className={`${styles.genres} section-padding-block`}>
      <Container contentClassName={styles.genres__content}>
        <h1 className="heading-1">Жанры фильмов</h1>

        <Suspense fallback={<Loader />}>
          <GenresList />
        </Suspense>
      </Container>
    </section>
  );
};
