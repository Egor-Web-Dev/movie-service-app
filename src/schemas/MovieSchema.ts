import { z } from "zod";

const MovieSchema = z.object({
  keywords: z.string().array(),
  backdropUrl: z.string().or(z.null()),
  production: z.string().or(z.null()),
  trailerYouTubeId: z.string(),
  language: z.string(),
  tmdbRating: z.number(),
  title: z.string(),
  cast: z.string().array(),
  revenue: z.string().or(z.null()),
  posterUrl: z.string().or(z.null()),
  plot: z.string(),
  genres: z.string().array(),
  id: z.number(),
  budget: z.string().or(z.null()),
  languages: z.string().array(),
  releaseDate: z.string().or(z.null()),
  director: z.string().or(z.null()),
  awardsSummary: z.string().or(z.null()),
  runtime: z.number(),
  trailerUrl: z.string(),
  releaseYear: z.number().or(z.null()),
  countriesOfOrigin: z.string().array(),
  originalTitle: z.string(),
  searchL: z.string(),
  homepage: z.string(),
  status: z.string(),
});

export default MovieSchema;
