import { z } from "zod";

const GenresSchema = z.string().array();

export default GenresSchema;
