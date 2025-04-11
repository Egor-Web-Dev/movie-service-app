import BASIC_URL from "./basicURL";
import type Response from "../types/Response";
import RegisterData from "../types/RegisterData";
import validateResponse from "./validateResponse";

export default function register(data: RegisterData): Promise<Response> {
  return fetch(`${BASIC_URL}user`, {
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
