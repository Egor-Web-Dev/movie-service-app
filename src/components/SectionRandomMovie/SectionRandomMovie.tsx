import { SectionHero } from "../SectionHero";
import { useSuspenseQuery } from "@tanstack/react-query";
import fetchRandomMovie from "../../api/fetchRandomMovie";

export const SectionRandomMovie = () => {
  const query = useSuspenseQuery({
    queryKey: ["random", "movie"],
    queryFn: fetchRandomMovie,
    gcTime: 0,
    retry: 1,
  });

  return <SectionHero movie={query.data} isRandomMovie />;
};
