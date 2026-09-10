"use client";
import React from "react";
import ScoreSquare from "@/components/ScoreSquare";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { FilePenLine } from "lucide-react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "@/api/apiWatchlist";
import { useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const { watchlistId } = React.use(params);

  const averageScore = useSelector(
    (state) => state.watchlistStore.averageScore,
  );
  const unWatchTime = useSelector(
    (state) => state.watchlistStore.unwatchedRuntime,
  );

  const {
    data: watchlistData,
    isLoading: watchlistMoviesLoading,
    error: watchlistMoviesError,
  } = useQuery({
    queryKey: ["getwatchlist", watchlistId],
    queryFn: () => getInfo(watchlistId),
  });

  if (watchlistMoviesLoading) {
    return <Spinner size="xl" text="Loading watchlist..." fullPage />;
  }

  if (watchlistMoviesError) {
    return (
      <div className="text-accent-color-900">
        Error loading watchlist: {watchlistMoviesError.message}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-4 sm:mb-6 flex items-center justify-between sm:justify-start gap-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          {watchlistData.name}
        </h1>
        <button
          onClick={() => router.push(`/watchlistedit/${watchlistId}`)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-secondary-text transition-colors hover:bg-card-background hover:text-accent-color-900"
          aria-label="Edit Watchlist"
        >
          <FilePenLine size={20} />
        </button>
      </div>

      {/* Description */}
      {watchlistData.description && (
        <div className="mb-6 sm:mb-8 max-w-3xl">
          <h2 className="mb-1 text-sm sm:text-base font-semibold text-primary-text">
            About this watchlist
          </h2>
          <p className="text-sm sm:text-base text-secondary-text">
            {watchlistData.description}
          </p>
        </div>
      )}

      {/* Stats / Scores */}
      <div className="mb-8 sm:mb-12 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6 max-w-2xl">
        <ScoreSquare
          title={"ITEMS ON LIST"}
          description={watchlistData?.movies?.length || 0}
        />
        <ScoreSquare
          title={"UNWATCHED RUNTIME"}
          description={`${Math.floor((unWatchTime || 0) / 60)}h ${(unWatchTime || 0) % 60}m`}
        />
        <ScoreSquare
          title={"AVERAGE SCORE"}
          description={typeof averageScore === "number" ? averageScore.toFixed(1) : averageScore || "0"}
        />
      </div>

      {/* Movies Grid */}
      {watchlistData.movies && watchlistData.movies.length > 0 ? (
        <div>
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold">Movies</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {watchlistData.movies.map((movieId, index) => (
              <MovieCard
                movieId={movieId}
                key={movieId || index}
                type={"showWatchlist"}
                watchlistId={watchlistId}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-[rgba(217,217,217,0.15)] bg-card-background/50 p-8 text-center text-secondary-text">
          No movies found in this watchlist. Explore and add movies from the home page!
        </div>
      )}
    </div>
  );
}

export default Page;
