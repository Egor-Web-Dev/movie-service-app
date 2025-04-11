import "./shortMovieInfoBlock.scss";
import { FC } from "react";
import type Movie from "../../types/Movie";
import IconStar from "../Icon/RatingStar.svg?react";

const SHORT_INFO_CLASS_NAME = "movie-info";

type MovieInfoProps = {
  movie: Movie;
};

export const ShortMovieInfoBlock: FC<MovieInfoProps> = ({ movie }) => {
  const getRatingСlassModifier = () => {
    const ratingOptions = [
      { rating: 6.99, modifier: "green" },
      { rating: 4, modifier: "gold" },
      { rating: 0.99, modifier: "red" },
    ];

    return (
      ratingOptions.find((o) => movie.tmdbRating > o.rating)?.modifier || "gray"
    );
  };

  return (
    <div className={`${SHORT_INFO_CLASS_NAME} flex`}>
      <span
        className={`${SHORT_INFO_CLASS_NAME}__rating ${SHORT_INFO_CLASS_NAME}__rating--${getRatingСlassModifier()} flex`}
      >
        <IconStar /> {movie.tmdbRating.toFixed(1)}
      </span>

      <span className={`${SHORT_INFO_CLASS_NAME}__year`}>
        {movie.releaseYear}
      </span>

      <span className={`${SHORT_INFO_CLASS_NAME}__genres`}>
        {movie.genres.slice(0, 2).join(", ")}
      </span>

      <span
        className={`${SHORT_INFO_CLASS_NAME}__duration`}
      >{`${movie.runtime} min`}</span>
    </div>
  );
};
