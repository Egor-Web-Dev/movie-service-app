import BASIC_URL from "./basicURL";
import type Movie from "../types/Movie";
import MovieSchema from "../schemas/MovieSchema";
import validateResponse from "./validateResponse";

export default function fetchTopMovies(): Promise<Movie[]> {
  return fetch(`${BASIC_URL}movie/top10`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.array().parse(data));
}
