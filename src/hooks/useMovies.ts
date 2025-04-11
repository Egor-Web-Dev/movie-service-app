import { useParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import MovieSearchParams from "../utils/MovieSearchParams";
import fetchSelectedMovies from "../api/fetchSelectedMovies";

const useMovies = (countMovies: number) => {
  const { genre } = useParams();

  const fetchMovies = async ({ pageParam = 1 }) => {
    const MovieQueryParams = new MovieSearchParams({
      count: countMovies + 1,
      genre: genre,
      page: pageParam,
    });

    const data = await fetchSelectedMovies(MovieQueryParams);

    return {
      nextCursor: data.length > countMovies ? pageParam + 1 : undefined,
      data: data.splice(0, countMovies),
    };
  };

  const query = useInfiniteQuery({
    queryKey: ["movies", genre],
    queryFn: fetchMovies,
    initialPageParam: 1,
    gcTime: 180_000,
    retry: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return { query, genre };
};

export default useMovies;
