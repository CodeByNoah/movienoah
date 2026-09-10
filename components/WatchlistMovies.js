"use client";
import React, { useState } from "react";
import Image from "next/image";
import { fetchMoviesDetails } from "@/api/apiThemoviedb";
import useDeleteMovie from "@/hooks/useDeleteMovie";
import { getImagePath } from "@/utils/dataHelper";
import { useQuery } from "@tanstack/react-query";

function WatchlistMovies({ movieId, setDeletedMovies }) {
  const [isdelete, setIsdelete] = useState(false);

  const {
    data: movieData,
    error: movieDataError,
    isLoading: movieDataLoading,
  } = useQuery({
    queryKey: ["getwatchlist", movieId],
    queryFn: () => fetchMoviesDetails(movieId),
  });

  const { deleteMovie, mutateDeleteLoading } = useDeleteMovie();

  if (movieDataLoading) {
    return (
      <div className="h-14 w-full animate-pulse rounded-md bg-card-background" />
    );
  }

  if (movieDataError || !movieData) {
    return null;
  }

  const imagePath = getImagePath(movieData.backdrop_path || movieData.poster_path);
  const finalImage =
    imagePath ||
    "https://image.tmdb.org/t/p/w300/kEYWal656zP5Q2Tohm91aw6orlT.jpg";

  async function handleDeleteMovie(e) {
    e.preventDefault();
    if (!isdelete) {
      setIsdelete(true);
      if (setDeletedMovies) {
        setDeletedMovies((prev) => [...prev, movieData]);
      }
    }
  }

  if (isdelete) return null;

  return (
    <div className="flex items-center rounded-md border border-[rgba(217,217,217,0.2)] bg-card-background/60 p-2 sm:p-3 transition-colors hover:border-[rgba(217,217,217,0.4)]">
      <div className="relative h-12 w-16 sm:h-14 sm:w-20 shrink-0 overflow-hidden rounded bg-[#202020] mr-3 sm:mr-4">
        <Image
          src={finalImage}
          alt={movieData.title || "Movie"}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <h4 className="flex-1 truncate pr-2 text-xs sm:text-sm font-semibold text-primary-text">
        {movieData.title}
      </h4>
      <button
        className="ml-auto shrink-0 cursor-pointer rounded-md border border-accent-color-900 px-3 py-1 text-xs sm:text-sm font-semibold text-accent-color-900 transition duration-150 hover:bg-accent-color-900 hover:text-black disabled:opacity-50"
        onClick={handleDeleteMovie}
        disabled={isdelete || mutateDeleteLoading}
      >
        Remove
      </button>
    </div>
  );
}

export default WatchlistMovies;
