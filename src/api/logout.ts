import BASIC_URL from "./basicURL";
import type Response from "../types/Response";
import validateResponse from "./validateResponse";

export default function logout(): Promise<Response> {
  return fetch(`${BASIC_URL}auth/logout`, { credentials: "include" })
    .then(validateResponse)
    .then((res) => res.json());
}
