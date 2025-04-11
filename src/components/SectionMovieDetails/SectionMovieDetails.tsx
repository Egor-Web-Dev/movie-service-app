import "./SectionMovieDetails.scss";
import { FC } from "react";
import { Section } from "../Section";
import type Movie from "../../types/Movie";

const SECTION_CLASS_NAME = "about-movie";
const DETAILS_BLOCK_CLASS_NAME = "details";
const ITEM_CLASS_NAME = `${DETAILS_BLOCK_CLASS_NAME}__item`;
const ITEM_TEXT_CLASS_NAME = `${DETAILS_BLOCK_CLASS_NAME}__item-text`;
const ITEM_VALUE_CLASS_NAME = `${DETAILS_BLOCK_CLASS_NAME}__item-value`;
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
    <Section className={SECTION_CLASS_NAME}>
      <h2 className={`${SECTION_CLASS_NAME}__title heading-2`}>О фильме</h2>

      <div
        className={`${SECTION_CLASS_NAME}__details ${DETAILS_BLOCK_CLASS_NAME} flex`}
      >
        <MovieDetail text="Язык оригинала" value={movie.language} />
        <MovieDetail text="Бюджет" value={movie.budget || NO_INFORMATION} />
        <MovieDetail text="Выручка" value={movie.revenue || NO_INFORMATION} />
        <MovieDetail text="Режиссёр" value={movie.director || NO_INFORMATION} />
        <MovieDetail
          text="Продакшен"
          value={movie.production || NO_INFORMATION}
        />
        <MovieDetail
          text="Награды"
          value={movie.awardsSummary || NO_INFORMATION}
        />
      </div>
    </Section>
  );
};

const MovieDetail: FC<DetailProps> = ({ text, value }) => {
  return (
    <div className={`${ITEM_CLASS_NAME} flex`}>
      <div className={`${ITEM_TEXT_CLASS_NAME} flex`}>
        <span>{text}</span>
        <div className="dash-line"></div>
      </div>
      <span className={ITEM_VALUE_CLASS_NAME}>{value}</span>
    </div>
  );
};
