import { z } from "zod";
import GenresSchema from "../schemas/GenresSchema";

type Genres = z.infer<typeof GenresSchema>;

export default Genres;
