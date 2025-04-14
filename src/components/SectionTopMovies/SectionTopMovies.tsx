import styles from "./sectionTopMovies.module.scss";
import { Container } from "../Container";
import { MovieCard } from "../MovieCard";
import fetchTopMovies from "../../api/fetchTopMovies";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SectionTopMovies = () => {
  const query = useSuspenseQuery({
    queryKey: ["movies", "top"],
    queryFn: fetchTopMovies,
    retry: 1,
  });

  return (
    <section className={styles.topMovies}>
      <Container contentClassName={styles.topMovies__content}>
        <h2 className="heading-2">Топ 10 фильмов</h2>
        <div className="list-wrapper">
          <ul className="horizontal-scrolling-list grid list-reset">
            {query.data.map((movie, i) => (
              <li key={movie.id}>
                <MovieCard className="" movie={movie}>
                  <span className={styles.movieNumber}>{i + 1}</span>
                </MovieCard>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};
