import BASIC_URL from "./basicURL";
import AuthInfo from "../types/AuthInfo";
import type Response from "../types/Response";
import validateResponse from "./validateResponse";

export default function login(data: AuthInfo): Promise<Response> {
  return fetch(`${BASIC_URL}auth/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  })
    .then(validateResponse)
    .then((res) => res.json());
}
