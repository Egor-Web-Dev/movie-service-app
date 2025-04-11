import "./searchMovieBlock.scss";
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
import { ShortMovieInfoBlock } from "../ShortMovieInfoBlock/ShortMovieInfoBlock";
import {
  FC,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const BLOCK_CLASS_NAME = "search-movies";
const MENU_CLASS_NAME = "dropdown-menu";
const DEFAULT_COUNT_MOVIES = 5;

type MenuCardProps = {
  movie: Movie;
};

export const SearchMovieBlock = () => {
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
    <div className={`${BLOCK_CLASS_NAME}`}>
      <div className={`${BLOCK_CLASS_NAME}__content`}>
        <Field
          className={`${BLOCK_CLASS_NAME}__field`}
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
              className={`${BLOCK_CLASS_NAME}__reset-btn`}
              kind="default"
              title="Очистить"
              onClick={handleResetClick}
            >
              <IconClose />
            </Button>

            <div
              className={`${BLOCK_CLASS_NAME}__dropdown-menu ${MENU_CLASS_NAME} flex`}
            >
              {(query.isLoading || query.isFetching) && (
                <MoonLoader
                  cssOverride={{ margin: "auto" }}
                  size={50}
                  color="white"
                />
              )}

              {query.data?.length === 0 && (
                <p className={`${MENU_CLASS_NAME}__message`}>
                  По вашему запросу ничего не найдено
                </p>
              )}

              {query.isSuccess && !query.isFetching && (
                <ul className={`${MENU_CLASS_NAME}__list flex list-reset`}>
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
  const cardClassName = "card";
  const handleCardClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.currentTarget.blur();
    closeModal();
  };

  return (
    <article className={`dropdown-menu__card ${cardClassName}`}>
      <Link
        className={`${cardClassName}__link flex`}
        to={`/movie/${movie.id}`}
        state={movie}
        onClick={handleCardClick}
      >
        <div className={`${cardClassName}__poster`}>
          <img src={movie.posterUrl || missingPoster} alt="Постер фильма" />
        </div>
        <div className={`${cardClassName}__right-side`}>
          <ShortMovieInfoBlock movie={movie} />
          <p className={`${cardClassName}__title`}>{movie.title}</p>
        </div>
      </Link>
    </article>
  );
};
