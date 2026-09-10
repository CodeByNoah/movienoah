"use client";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { resetHistory } from "@/redux/slices/historySlice";

function Page() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.historyStore.movies);

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Watch History
        </h1>
        {selector.length > 0 && (
          <button
            onClick={() => dispatch(resetHistory())}
            className="cursor-pointer text-sm sm:text-base font-semibold text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
          >
            Clear history
          </button>
        )}
      </div>

      {selector.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {selector.map((movie, index) => (
            <MovieCard movieId={movie} key={movie || index} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-[rgba(217,217,217,0.15)] bg-card-background/50 p-10 text-center text-secondary-text">
          No watch history found. Movies you view will appear here.
        </div>
      )}
    </div>
  );
}

export default Page;
