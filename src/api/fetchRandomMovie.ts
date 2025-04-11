import Film from "../types/Movie";
import BASIC_URL from "./basicURL";
import MovieSchema from "../schemas/MovieSchema";
import validateResponse from "./validateResponse";

export default function fetchRandomMovie(): Promise<Film> {
  return fetch(`${BASIC_URL}movie/random`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.parse(data));
}
