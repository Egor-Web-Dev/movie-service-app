import styles from "./genresList.module.scss";
import { FC } from "react";
import { Link } from "react-router";
import fetchGenres from "../../api/fetchGenres";
import getGenreImage from "../../assets/images/genres";
import { useSuspenseQuery } from "@tanstack/react-query";

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
      className={`${styles.genresList} list-reset vertical-scrolling-list grid`}
    >
      {query.data.map((genre, i) => (
        <li key={i}>
          <GenreCard genre={genre} />
        </li>
      ))}
    </ul>
  );
};

const GenreCard: FC<GenreCardProps> = ({ genre }) => {
  return (
    <div className={styles.genreCard}>
      <Link to={`/genres/${genre}`}>
        <div className={`${styles.genreCard__poster} flex`}>
          <img src={getGenreImage(genre)} loading="lazy" alt="Логотип жанра" />
        </div>

        <div className={styles.genreCard__name}>{genre}</div>
      </Link>
    </div>
  );
};
