import styles from "./sectionMovieDetails.module.scss";
import { FC } from "react";
import { Container } from "../Container";
import type Movie from "../../types/Movie";

const NO_INFORMATION = "Нет информации";

type SectionProps = {
  movie: Movie;
};

type DetailProps = {
  text: string;
  value: string;
};

export const SectionMovieDetails: FC<SectionProps> = ({ movie }) => {
  return (
    <section className={styles.aboutMovie}>
      <Container contentClassName={styles.aboutMovie__content}>
        <h2 className="heading-2">О фильме</h2>

        <div className={`${styles.details} flex`}>
          <MovieDetail text="Язык оригинала" value={movie.language} />
          <MovieDetail text="Бюджет" value={movie.budget || NO_INFORMATION} />
          <MovieDetail text="Выручка" value={movie.revenue || NO_INFORMATION} />
          <MovieDetail
            text="Режиссёр"
            value={movie.director || NO_INFORMATION}
          />
          <MovieDetail
            text="Продакшен"
            value={movie.production || NO_INFORMATION}
          />
          <MovieDetail
            text="Награды"
            value={movie.awardsSummary || NO_INFORMATION}
          />
        </div>
      </Container>
    </section>
  );
};

const MovieDetail: FC<DetailProps> = ({ text, value }) => {
  return (
    <div className={`${styles.details__item} flex`}>
      <div className={`${styles.details__text} flex`}>
        <span>{text}</span>
        <div className={styles.dashLine}></div>
      </div>
      <span className={styles.details__value}>{value}</span>
    </div>
  );
};
