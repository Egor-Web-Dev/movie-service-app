import "./FavoriteMovies.scss";
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

const BLOCK_CLASS_NAME = "favorites";

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
    <div className={`account__favorites ${BLOCK_CLASS_NAME}`}>
      {(query.isLoading || query.isFetching) && <Loader />}
      {query.error && <ErrorBlock text={query.error.message} />}

      {query.isSuccess && !query.isFetching && (
        <div className={`${BLOCK_CLASS_NAME}__list-wrapper list-wrapper`}>
          <ul
            className={`${BLOCK_CLASS_NAME}__list horizontal-scrolling-list grid list-reset`}
          >
            {movies.map((m) => (
              <li className="list__item" key={m.id}>
                <MovieCard movie={m}>
                  <Button
                    className={`${BLOCK_CLASS_NAME}__delete-btn`}
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
