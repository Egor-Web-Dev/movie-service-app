import { z } from "zod";

const UserSchema = z.object({
  favorites: z.string().array(),
  email: z.string(),
  name: z.string(),
  surname: z.string(),
});

export default UserSchema;
