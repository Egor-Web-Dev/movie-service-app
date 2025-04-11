import "./genresList.scss";
import { FC } from "react";
import { Link } from "react-router";
import fetchGenres from "../../api/fetchGenres";
import getGenreImage from "../../assets/images/genres";
import { useSuspenseQuery } from "@tanstack/react-query";

const LIST_CLASS_NAME = "genres-list";
const CARD_CLASS_NAME = "genre-card";

type GenreCardProps = {
  genre: string;
};

export const GenresList = () => {
  const query = useSuspenseQuery({
    queryKey: ["genres"],
    queryFn: fetchGenres,
    retry: 1,
  });

  return (
    <ul
      className={`${LIST_CLASS_NAME} list-reset vertical-scrolling-list grid`}
    >
      {query.data.map((g, i) => (
        <li className={`${LIST_CLASS_NAME}__item`} key={i}>
          <GenreCard genre={g} />
        </li>
      ))}
    </ul>
  );
};

const GenreCard: FC<GenreCardProps> = ({ genre }) => {
  return (
    <div className={`${LIST_CLASS_NAME}__card genre-card`}>
      <Link to={`/genres/${genre}`}>
        <div className={`${CARD_CLASS_NAME}__poster flex`}>
          <img src={getGenreImage(genre)} loading="lazy" alt="Логотип жанра" />
        </div>

        <div className={`${CARD_CLASS_NAME}__genre-name`}>{genre}</div>
      </Link>
    </div>
  );
};
