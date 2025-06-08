"use client";
import React from "react";
import ScoreSquere from "@/components/ScoreSquare";
import MovieCard from "@/components/MovieCard";
import { FilePenLine } from "lucide-react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getInfo } from "@/api/apiWatchlist";
import { useParams, useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const { watchlistId } = React.use(params);
  console.log(watchlistId);

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

  if (watchlistMoviesLoading) return <div>...loading</div>;
  if (watchlistMoviesError) {
    return (
      <div>
        something wrong in fetching movies from watchlist{" "}
        {watchlistMoviesError.message}
      </div>
    );
  }
  return (
    <>
      <div className="mb-6 flex items-center gap-7">
        <h2 className="text-3xl font-bold">{watchlistData.name}</h2>
        {/*<FiEdit*/}
        {/*  className="watchlisttitle-icon"*/}
        {/*  onClick={() => navigate(`/watchlistedit/${watchlistId}`)}*/}
        {/*/>*/}
        <FilePenLine
          className="cursor-pointer transition duration-200 hover:text-accent-color-900"
          onClick={() => router.push(`/watchlistedit/${watchlistId}`)}
        />
      </div>
      <h4 className="mt-2.5 text-lg font-bold">درباره‌ی این لیست تماشا</h4>
      <p className="mb-16">{watchlistData.description}</p>
      <div className="mb-16 flex items-center gap-8">
        <ScoreSquere
          title={"ITEMS ON LIST"}
          description={watchlistData?.movies?.length || 0}
        />
        <ScoreSquere
          title={"UNWATCHED RUTIME"}
          description={`${(unWatchTime / 60).toFixed(0)}h ${(unWatchTime % 60).toFixed(0)}m`}
          // description="2h 19m"
        />
        <ScoreSquere title={"AVERAGE SCORE"} description={averageScore} />
      </div>
      {watchlistData.movies ? (
        <div className="grid grid-cols-5 gap-14 gap-y-14">
          {watchlistData.movies.map((movieId, index) => (
            <MovieCard
              movieId={movieId}
              key={index}
              type={"showWatchlist"}
              watchlistId={watchlistId}
            />
          ))}
        </div>
      ) : (
        <div>No movies found in this watchlist.</div>
      )}
    </>
  );
}

export default Page;
