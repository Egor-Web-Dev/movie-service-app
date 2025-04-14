import styles from "./movieCard.module.scss";
import { Link } from "react-router";
import type Movie from "../../types/Movie";
import { FC, memo, ReactNode } from "react";
import missingImage from "../../assets/images/missing-image.webp";

type Props = {
  className: string;
  movie: Movie;
  children?: ReactNode;
};

export const MovieCard: FC<Props> = memo(({ className, movie, children }) => {
  return (
    <article className={`${styles.movieCard} ${className}`}>
      <Link to={`/movie/${movie.id}`} state={movie}>
        <img
          className={styles.movieCard__poster}
          src={movie.posterUrl || missingImage}
          loading="lazy"
          alt="Постер фильма"
        />
      </Link>
      {children}
    </article>
  );
});
