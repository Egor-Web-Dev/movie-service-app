import { z } from "zod";
import MovieSchema from "../schemas/MovieSchema";

type Movie = z.infer<typeof MovieSchema>;

export default Movie;
