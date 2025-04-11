import "./MovieCard.scss";
import { Link } from "react-router";
import { FC, memo, ReactNode } from "react";
import type Movie from "../../types/Movie";
import missingImage from "../../assets/images/missing-image.webp";

const CARD_CLASS_NAME = "movie-card";

type Props = {
  movie: Movie;
  children?: ReactNode;
};

export const MovieCard: FC<Props> = memo(({ movie, children }) => {
  return (
    <article className={CARD_CLASS_NAME}>
      <Link to={`/movie/${movie.id}`} state={movie}>
        <img
          className={`${CARD_CLASS_NAME}__poster`}
          src={movie.posterUrl || missingImage}
          loading="lazy"
          alt="Постер фильма"
        />
      </Link>
      {children}
    </article>
  );
});
