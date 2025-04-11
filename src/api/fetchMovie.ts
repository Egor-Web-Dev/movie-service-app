import BASIC_URL from "./basicURL";
import type Movie from "../types/Movie";
import MovieSchema from "../schemas/MovieSchema";
import validateResponse from "./validateResponse";

export default function fetchMovie(id: string): Promise<Movie> {
  return fetch(`${BASIC_URL}movie/${id}`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.parse(data));
}
