import { z } from "zod";
import UserSchema from "../schemas/UserSchema.ts";

type User = z.infer<typeof UserSchema>;

export default User;
