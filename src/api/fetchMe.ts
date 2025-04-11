import BASIC_URL from "./basicURL";
import type User from "../types/User";
import UserSchema from "../schemas/UserSchema";
import validateResponse from "./validateResponse";

export default function fetchMe(): Promise<User | null> {
  return fetch(`${BASIC_URL}profile`, { credentials: "include" })
    .then(validateResponse)
    .then((res) => res.json())
    .then((data) => UserSchema.parse(data))
    .catch(() => null);
}
