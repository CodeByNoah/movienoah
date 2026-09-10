"use client";
import React from "react";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieByName } from "@/api/apiThemoviedb";

function Page({ params }) {
  const { movieName } = React.use(params);
  const decodedMovieName = decodeURIComponent(movieName || "");

  const {
    data: searchresults,
    isLoading: searchresultsLoading,
    error: searchresultsError,
  } = useQuery({
    queryKey: ["searchresults", decodedMovieName],
    queryFn: () => fetchMovieByName(decodedMovieName),
    enabled: Boolean(decodedMovieName),
  });

  if (searchresultsLoading) {
    return (
      <Spinner
        size="xl"
        text={`Searching for "${decodedMovieName}"...`}
        fullPage
      />
    );
  }

  if (searchresultsError) {
    return (
      <div className="text-accent-color-900">
        Something went wrong while searching.
      </div>
    );
  }

  const finalresult = searchresults ? searchresults.slice(0, 20) : [];

  return (
    <div className="w-full">
      <h1 className="mb-6 sm:mb-8 text-2xl sm:text-3xl font-extrabold tracking-tight">
        Search results for: <span className="text-accent-color-900">&ldquo;{decodedMovieName}&rdquo;</span>
      </h1>

      {finalresult.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {finalresult.map((movie) => (
            <MovieCard movieId={movie.id} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[rgba(217,217,217,0.15)] bg-card-background/50 p-10 text-center text-secondary-text">
          No movies found matching &ldquo;{decodedMovieName}&rdquo;. Try another search!
        </div>
      )}
    </div>
  );
}

export default Page;
