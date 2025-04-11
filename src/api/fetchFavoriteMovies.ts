import Film from "../types/Movie";
import BASIC_URL from "./basicURL";
import MovieSchema from "../schemas/MovieSchema";
import validateResponse from "./validateResponse";

export default function fetchFavoriteMovies(): Promise<Film[]> {
  return fetch(`${BASIC_URL}favorites`, { credentials: "include" })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => MovieSchema.array().parse(data));
}
