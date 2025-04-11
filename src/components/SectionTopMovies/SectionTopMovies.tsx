import "./SectionTopMovies.scss";
import { Section } from "../Section";
import { MovieCard } from "../MovieCard";
import fetchTopMovies from "../../api/fetchTopMovies";
import { useSuspenseQuery } from "@tanstack/react-query";

const SECTION_CLASS_NAME = "top-movies";

export const SectionTopMovies = () => {
  const query = useSuspenseQuery({
    queryKey: ["movies", "top"],
    queryFn: fetchTopMovies,
    retry: 1,
  });

  return (
    <Section className={SECTION_CLASS_NAME}>
      <h2 className={`${SECTION_CLASS_NAME}__title heading-2`}>
        Топ 10 фильмов
      </h2>

      <div className={`${SECTION_CLASS_NAME}__list-wrapper list-wrapper`}>
        <ul
          className={`${SECTION_CLASS_NAME}__list horizontal-scrolling-list grid list-reset`}
        >
          {query.data.map((movie, i) => (
            <li className={"list__item"} key={movie.id}>
              <MovieCard movie={movie}>
                <span className="movie-number">{i + 1}</span>
              </MovieCard>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
};
