import BASIC_URL from "./basicURL";
import type Response from "../types/Response";
import validateResponse from "./validateResponse";

export default function addFavoriteMovie(
  id: string | number
): Promise<Response> {
  return fetch(`${BASIC_URL}favorites`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
  })
    .then(validateResponse)
    .then((res) => res.json());
}
