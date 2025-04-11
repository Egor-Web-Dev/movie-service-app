import { FC, Suspense } from "react";
import type Movie from "../../types/Movie";
import fetchMovie from "../../api/fetchMovie";
import { useLocation, useParams } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { SectionHero } from "../../components/SectionHero";
import { SectionMovieDetails } from "../../components/SectionMovieDetails";

type PageContentProps = {
  movie: Movie;
};

export const MovieDetailsPage = () => {
  const movie = useLocation().state as Movie;
  return movie ? (
    <PageContent movie={movie} />
  ) : (
    <Suspense>
      <LoadingPageContent />
    </Suspense>
  );
};

const PageContent: FC<PageContentProps> = ({ movie }) => {
  return (
    <>
      <SectionHero movie={movie} isRandomMovie={false} />
      <SectionMovieDetails movie={movie} />
    </>
  );
};

const LoadingPageContent = () => {
  const { movieId } = useParams();
  const query = useSuspenseQuery({
    queryKey: ["movie", "details", movieId],
    queryFn: () => fetchMovie(movieId!),
    retry: 1,
  });

  return <PageContent movie={query.data} />;
};
