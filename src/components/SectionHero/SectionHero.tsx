import styles from "./sectionHero.module.scss";
import { Button } from "../Button";
import { Link } from "react-router";
import { FC, useContext } from "react";
import { Container } from "../Container";
import type User from "../../types/User";
import type Movie from "../../types/Movie";
import { RootState } from "../../store/store";
import { ModalContext } from "../ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import addFavoriteMovie from "../../api/addFavoriteMovie";
import IconRandom from "../Icon/Random.svg?react";
import IconHeartActive from "../Icon/HeartActive.svg?react";
import IconHeartInactive from "../Icon/HeartInactive.svg?react";
import missingPoster from "../../assets/images/missing-poster.webp";
import { addMovie, deleteMovie } from "../../store/userSlice";
import deleteFavoriteMovie from "../../api/deleteFavoriteMovie";
import { MovieShortInfo } from "../MovieShortInfo/MovieShortInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type SectionProps = {
  movie: Movie;
  isRandomMovie: boolean;
};

export const SectionHero: FC<SectionProps> = ({ movie, isRandomMovie }) => {
  const movieId = String(movie.id);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { openModal } = useContext(ModalContext);
  const user = useSelector<RootState, User | null>((state) => state.user.info);

  const isFavorite = user?.favorites.includes(movieId) || false;

  const { mutate } = useMutation({
    mutationFn: isFavorite ? deleteFavoriteMovie : addFavoriteMovie,
    mutationKey: ["like", movieId],
    onSuccess() {
      const toggleLike = isFavorite ? deleteMovie : addMovie;
      dispatch(toggleLike(movieId));
    },
  });

  const handleLikeClick = () => {
    if (user) return mutate(movieId);
    return openModal("auth");
  };

  const handleShowTrailerClick = () => openModal("trailer", { trailer: movie });
  const handleRandomMovieClick = () => {
    queryClient.invalidateQueries({ queryKey: ["random", "movie"] });
  };

  return (
    <section className={styles.hero}>
      <Container contentClassName={styles.hero__content}>
        <div className={styles.movieDescr}>
          <MovieShortInfo className={styles.movieDescr__top} movie={movie} />

          <h1 className={`${styles.hero__title} heading-1`}>{movie.title}</h1>

          <p className={styles.hero__plot}>{movie.plot}</p>

          <div
            className={`${styles.buttons} flex ${
              isRandomMovie ? "flex-wrap" : ""
            }`}
          >
            <Button
              className={styles.buttons__openTrailer}
              kind="primary"
              onClick={handleShowTrailerClick}
            >
              Трейлер
            </Button>

            {isRandomMovie && (
              <Link
                className={`${styles.buttons__aboutMovie} flex`}
                to={`movie/${movie.id}`}
                state={movie}
              >
                О фильме
              </Link>
            )}

            <Button
              className={styles.buttons__likeMovie}
              kind="secondary"
              title="Нравится"
              onClick={handleLikeClick}
            >
              {isFavorite ? <IconHeartActive /> : <IconHeartInactive />}
            </Button>

            {isRandomMovie && (
              <Button
                className=""
                kind="secondary"
                title="Случайный фильм"
                onClick={handleRandomMovieClick}
              >
                <IconRandom />
              </Button>
            )}
          </div>
        </div>

        <div className={`${styles.hero__poster} flex`}>
          <img src={movie.backdropUrl || missingPoster} alt="Постер фильма" />
        </div>
      </Container>
    </section>
  );
};
