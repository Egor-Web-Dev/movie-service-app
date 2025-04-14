import styles from "./moviesPage.module.scss";
import { Link } from "react-router";
import useMovies from "../../hooks/useMovies";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Container } from "../../components/Container";
import { MovieCard } from "../../components/MovieCard";
import { ErrorBlock } from "../../components/ErrorBlock";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import IconArrowBack from "../../components/Icon/ArrowBack.svg?react";

const DEFAULT_COUNT_MOVIES = 10;

export const MoviesPage = () => {
  const { query, genre } = useMovies(DEFAULT_COUNT_MOVIES);
  const movies = query.data?.pages.flatMap((page) => page.data) || [];

  const handleMoreBtnClick = () => query.fetchNextPage();

  return (
    <section className={`${styles.movies} section-padding-block`}>
      <Container contentClassName={styles.movies__content}>
        <h1 className="heading-1">
          <Link className={`${styles.movies__titleLink} flex`} to="/genres">
            <IconArrowBack />
            {capitalizeFirstLetter(genre || "Movies")}
          </Link>
        </h1>

        {query.isLoading && <Loader />}

        {query.error && <ErrorBlock text={query.error.message} />}

        <ul
          className={`${styles.movies__list} vertical-scrolling-list grid list-reset`}
        >
          {movies.map((m) => (
            <li key={m.id}>
              <MovieCard className={styles.movies__movieCard} movie={m} />
            </li>
          ))}
        </ul>

        {query.hasNextPage && (
          <Button
            className={styles.movies__moreBtn}
            kind="primary"
            isLoading={query.isFetching}
            onClick={handleMoreBtnClick}
          >
            Показать ещё
          </Button>
        )}
      </Container>
    </section>
  );
};
