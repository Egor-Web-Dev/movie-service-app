import "./sectionHero.scss";
import { Button } from "../Button";
import { Link } from "react-router";
import { Section } from "../Section";
import { FC, useContext } from "react";
import type User from "../../types/User";
import type Movie from "../../types/Movie";
import { RootState } from "../../store/store";
import { ModalContext } from "../ModalProvider";
import { useDispatch, useSelector } from "react-redux";
import addFavoriteMovie from "../../api/addFavoriteMovie";
import { addMovie, deleteMovie } from "../../store/userSlice";
import deleteFavoriteMovie from "../../api/deleteFavoriteMovie";
import IconRandom from "../Icon/Random.svg?react";
import IconHeartActive from "../Icon/HeartActive.svg?react";
import IconHeartInactive from "../Icon/HeartInactive.svg?react";
import missingPoster from "../../assets/images/missing-poster.webp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShortMovieInfoBlock } from "../ShortMovieInfoBlock/ShortMovieInfoBlock";

const SECTION_CLASS_NAME = "hero";

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

  const getElementClassName = () => (isRandomMovie ? "flex-wrap" : "");

  return (
    <Section className={SECTION_CLASS_NAME}>
      <div className={`${SECTION_CLASS_NAME}__movie-descr`}>
        <ShortMovieInfoBlock movie={movie} />

        <h1 className={`${SECTION_CLASS_NAME}__title heading-1`}>
          {movie.title}
        </h1>
        <p className={`${SECTION_CLASS_NAME}__plot`}>{movie.plot}</p>

        <div
          className={`${SECTION_CLASS_NAME}__buttons buttons flex ${getElementClassName()}`.trim()}
        >
          <Button
            className="buttons__open-trailer"
            kind="primary"
            onClick={handleShowTrailerClick}
          >
            Трейлер
          </Button>

          {isRandomMovie && (
            <Link
              className={`buttons__about-movie secondary-btn btn flex`}
              to={`movie/${movie.id}`}
              state={movie}
            >
              О фильме
            </Link>
          )}

          <Button
            className="buttons__like-movie"
            kind="secondary"
            title="Нравится"
            onClick={handleLikeClick}
          >
            {isFavorite ? <IconHeartActive /> : <IconHeartInactive />}
          </Button>

          {isRandomMovie && (
            <Button
              className="buttons__random-movie"
              kind="secondary"
              title="Случайный фильм"
              onClick={handleRandomMovieClick}
            >
              <IconRandom />
            </Button>
          )}
        </div>
      </div>

      <div className={`${SECTION_CLASS_NAME}__poster flex`}>
        <img src={movie.backdropUrl || missingPoster} alt="Постер фильма" />
      </div>
    </Section>
  );
};
