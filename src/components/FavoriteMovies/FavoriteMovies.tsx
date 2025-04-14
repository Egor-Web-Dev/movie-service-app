import styles from "./favoriteMovies.module.scss";
import { Loader } from "../Loader";
import { Button } from "../Button";
import Movie from "../../types/Movie";
import { MovieCard } from "../MovieCard";
import { ErrorBlock } from "../ErrorBlock";
import { useEffect, useState } from "react";
import IconClose from "../Icon/Close.svg?react";
import { useQuery } from "@tanstack/react-query";
import deleteFavoriteMovie from "../../api/deleteFavoriteMovie";
import fetchFavoriteMovies from "../../api/fetchFavoriteMovies";

export const FavoriteMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const query = useQuery({
    queryFn: fetchFavoriteMovies,
    queryKey: ["favorites"],
    retry: 1,
  });

  useEffect(() => {
    if (query.data) setMovies(query.data);
  }, [setMovies, query.data]);

  const handleDeleteBtnClick = (movieId: number | string) => () => {
    deleteFavoriteMovie(movieId).then(() => {
      setMovies(movies.filter((m) => m.id !== movieId));
    });
  };

  return (
    <div className={styles.favorites}>
      {(query.isLoading || query.isFetching) && <Loader />}
      {query.error && <ErrorBlock text={query.error.message} />}

      {query.isSuccess && !query.isFetching && (
        <div className="list-wrapper">
          <ul className="horizontal-scrolling-list grid list-reset">
            {movies.map((m) => (
              <li key={m.id}>
                <MovieCard className={styles.favorites__movieCard} movie={m}>
                  <Button
                    className={styles.favorites__deleteBtn}
                    kind="secondary"
                    onClick={handleDeleteBtnClick(m.id)}
                  >
                    <IconClose />
                  </Button>
                </MovieCard>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
