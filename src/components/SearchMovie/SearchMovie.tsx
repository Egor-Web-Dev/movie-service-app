import styles from "./searchMovie.module.scss";
import { Field } from "../Field";
import { Button } from "../Button";
import { Link } from "react-router";
import type Movie from "../../types/Movie";
import { MoonLoader } from "react-spinners";
import { ModalContext } from "../ModalProvider";
import { useQuery } from "@tanstack/react-query";
import IconClose from "../Icon/Close.svg?react";
import IconSearch from "../Icon/Search.svg?react";
import MovieSearchParams from "../../utils/MovieSearchParams";
import fetchSelectedMovies from "../../api/fetchSelectedMovies";
import missingPoster from "../../assets/images/missing-poster.webp";
import { MovieShortInfo } from "../MovieShortInfo/MovieShortInfo";
import {
  FC,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const DEFAULT_COUNT_MOVIES = 5;

type MenuCardProps = {
  movie: Movie;
};

export const SearchMovie = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  const requestParams = new MovieSearchParams({
    count: DEFAULT_COUNT_MOVIES,
    title: value,
  });

  const query = useQuery({
    queryKey: ["search", "movies", value],
    queryFn: () => fetchSelectedMovies(requestParams),
    enabled: false,
    gcTime: 0,
    retry: 1,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, 250);

    return () => clearTimeout(timerId);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) query.refetch();
  }, [debouncedValue]);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleResetClick = () => {
    setValue("");
    ref.current?.focus();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.currentTarget.value.replace(/\s+/g, " ");
    setValue(currentValue);
  };

  return (
    <div className={styles.searchMovies}>
      <div className={styles.searchMovies__content}>
        <Field
          className={styles.searchMovies__field}
          id="search"
          type="text"
          value={value}
          placeholder="Поиск"
          ref={ref}
          onChange={handleInput}
          icon={<IconSearch />}
        />

        {value && (
          <>
            <Button
              className={styles.searchMovies__resetBtn}
              kind="default"
              title="Очистить"
              onClick={handleResetClick}
            >
              <IconClose />
            </Button>

            <div className={`${styles.dropdownMenu} flex`}>
              {(query.isLoading || query.isFetching) && (
                <MoonLoader
                  cssOverride={{ margin: "auto" }}
                  size={50}
                  color="white"
                />
              )}

              {query.data?.length === 0 && (
                <p className={styles.dropdownMenu__message}>
                  По вашему запросу ничего не найдено
                </p>
              )}

              {query.isSuccess && !query.isFetching && (
                <ul className={`${styles.dropdownMenu__list} flex list-reset`}>
                  {query.data.map((movie) => (
                    <li key={movie.id}>
                      <MenuCard movie={movie} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MenuCard: FC<MenuCardProps> = ({ movie }) => {
  const { closeModal } = useContext(ModalContext);
  const handleCardClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.currentTarget.blur();
    closeModal();
  };

  return (
    <article className={styles.movieCard}>
      <Link
        className={`${styles.movieCard__link} flex`}
        to={`/movie/${movie.id}`}
        state={movie}
        onClick={handleCardClick}
      >
        <div className={styles.movieCard__poster}>
          <img src={movie.posterUrl || missingPoster} alt="Постер фильма" />
        </div>

        <div className="wrapper">
          <MovieShortInfo
            className={styles.movieCard__shortInfo}
            movie={movie}
          />

          <p className={styles.movieCard__title}>{movie.title}</p>
        </div>
      </Link>
    </article>
  );
};
