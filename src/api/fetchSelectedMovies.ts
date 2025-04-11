import BASIC_URL from "./basicURL";
import type Movie from "../types/Movie";
import MovieSchema from "../schemas/MovieSchema";
import validateResponse from "./validateResponse";
import type MovieQueryParams from "../types/MovieQueryParams";

export default function fetchSelectedMovies(
  searchParams: MovieQueryParams
): Promise<Movie[]> {
  return fetch(`${BASIC_URL}movie/?${searchParams.toString()}`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.array().parse(data));
}
