import styles from "./movieShortInfo.module.scss";
import { FC } from "react";
import type Movie from "../../types/Movie";
import IconStar from "../Icon/RatingStar.svg?react";

type MovieInfoProps = {
  className: string;
  movie: Movie;
};

const RATING_OPTIONS = [
  { rating: 6.99, modifier: styles.green },
  { rating: 4, modifier: styles.gold },
  { rating: 0.99, modifier: styles.red },
];

export const MovieShortInfo: FC<MovieInfoProps> = ({ movie, className }) => {
  return (
    <div className={`${styles.movieInfo} ${className} flex`}>
      <div
        className={`${styles.movieRating} ${getRatingModifier(
          movie.tmdbRating
        )} flex`}
        data-id="rating"
      >
        <IconStar /> <span>{movie.tmdbRating.toFixed(1)}</span>
      </div>

      <span className="year">{movie.releaseYear}</span>
      <span className="genres">{movie.genres.slice(0, 2).join(", ")}</span>
      <span className="duration">{`${movie.runtime} min`}</span>
    </div>
  );
};

const getRatingModifier = (rating: number) => {
  return RATING_OPTIONS.find((o) => rating > o.rating)?.modifier || styles.gray;
};
