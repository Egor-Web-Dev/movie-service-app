import BASIC_URL from "./basicURL";
import type Response from "../types/Response";
import validateResponse from "./validateResponse";

export default function deleteFavoriteMovie(
  id: string | number
): Promise<Response> {
  return fetch(`${BASIC_URL}favorites/${id}`, {
    method: "DELETE",
    credentials: "include",
  })
    .then(validateResponse)
    .then((res) => res.json());
}
