import BASIC_URL from "./basicURL";
import type Genres from "../types/Genres";
import validateResponse from "./validateResponse";
import GenresSchema from "../schemas/GenresSchema";

export default function fetchGenres(): Promise<Genres> {
  return fetch(`${BASIC_URL}movie/genres`)
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => GenresSchema.parse(data));
}
