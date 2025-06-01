import React from "react";
import ScoreSquere from "@/components/ScoreSquare";
import MovieCard from "@/components/MovieCard";
import { FilePenLine } from "lucide-react";

function Page() {
  return (
    <>
      <div className="mb-6 flex items-center gap-7">
        <h2 className="text-3xl font-bold">
          {/*{watchlistData.name}*/}
          روانشناسی
        </h2>
        {/*<FiEdit*/}
        {/*  className="watchlisttitle-icon"*/}
        {/*  onClick={() => navigate(`/watchlistedit/${watchlistId}`)}*/}
        {/*/>*/}
        <FilePenLine className="cursor-pointer transition duration-200 hover:text-accent-color-900" />
      </div>
      <h4 className="mt-2.5 text-lg font-bold">درباره‌ی این لیست تماشا</h4>
      <p className="mb-16">
        {/*{watchlistData.description}*/}
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
      </p>
      <div className="mb-16 flex items-center gap-8">
        <ScoreSquere
          title={"ITEMS ON LIST"}
          // description={watchlistData?.movies?.length || 0}
          description="1"
        />
        <ScoreSquere
          title={"UNWATCHED RUTIME"}
          // description={`${(unWatchTime / 60).toFixed(0)}h ${(unWatchTime % 60).toFixed(0)}m`}
          description="2h 19m"
        />
        <ScoreSquere
          title={"AVERAGE SCORE"}
          // description={averageScore}
        />
      </div>
      {/*{watchlistData.movies ? (*/}
      {/*  <div className="moviecards">*/}
      {/*    {watchlistData.movies.map((movieId, index) => (*/}
      {/*      <MovieCard movieId={movieId} key={index} type={"showWatchlist"} />*/}
      {/*    ))}*/}
      {/*  </div>*/}
      <div className="grid grid-cols-5 gap-14 gap-y-14">
        <MovieCard type={"showWatchlist"} />
        <MovieCard type={"showWatchlist"} />
        <MovieCard type={"showWatchlist"} />
        <MovieCard type={"showWatchlist"} />
        <MovieCard type={"showWatchlist"} />
      </div>
      {/*) : (<div>No movies found in this watchlist.</div>*/}
      {/*)}*/}
    </>
  );
}

export default Page;
