import "./moviesPage.scss";
import { Link } from "react-router";
import useMovies from "../../hooks/useMovies";
import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { Section } from "../../components/Section";
import { MovieCard } from "../../components/MovieCard";
import { ErrorBlock } from "../../components/ErrorBlock";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";
import IconArrowBack from "../../components/Icon/ArrowBack.svg?react";

const DEFAULT_COUNT_MOVIES = 10;
const SECTION_CLASS_NAME = "movies";

export const MoviesPage = () => {
  const { query, genre } = useMovies(DEFAULT_COUNT_MOVIES);
  const movies = query.data?.pages.flatMap((page) => page.data) || [];

  return (
    <Section
      className={SECTION_CLASS_NAME}
      optionalClassName="section-padding-block"
    >
      <h1 className="heading-1">
        <Link className={`${SECTION_CLASS_NAME}__link-title flex`} to="/genres">
          <IconArrowBack />
          {capitalizeFirstLetter(genre || "Movies")}
        </Link>
      </h1>

      {query.error && <ErrorBlock text={query.error.message} />}
      {query.isLoading && <Loader />}

      <ul
        className={`${SECTION_CLASS_NAME}__list vertical-scrolling-list grid list-reset`}
      >
        {movies.map((m) => (
          <li className={"list__item"} key={m.id}>
            <MovieCard movie={m} />
          </li>
        ))}
      </ul>

      {query.hasNextPage && (
        <Button
          className={`${SECTION_CLASS_NAME}__more-btn`}
          onClick={() => query.fetchNextPage()}
          kind="primary"
          isLoading={query.isFetching}
        >
          Показать ещё
        </Button>
      )}
    </Section>
  );
};
