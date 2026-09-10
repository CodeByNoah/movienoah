"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaImdb } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Check, CircleX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDirectorAndCasts, fetchMoviesDetails } from "@/api/apiThemoviedb";
import { getImagePath } from "@/utils/dataHelper";
import { addMovieRx, deleteMovieRx } from "@/redux/slices/watchlistSlice";
import { useDispatch } from "react-redux";
import useDeleteMovie from "@/hooks/useDeleteMovie";
import AddMovieModal from "@/components/AddMovieModal";

function MovieCard({ type, movieId, watchlistId }) {
  const [isMovieAdded, setIsMovieAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const {
    data: movieData,
    error: movieDataError,
    isLoading: movieDataLoading,
  } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => fetchMoviesDetails(movieId),
  });

  const {
    data: directorname,
    error: directorNameError,
    isLoading: directorNameLoading,
  } = useQuery({
    queryKey: ["directorname", movieId],
    queryFn: () => fetchDirectorAndCasts(movieId, "director"),
  });
  const { deleteMovie, mutateDeleteLoading } = useDeleteMovie();

  useEffect(() => {
    if (movieData && !isMovieAdded) {
      dispatch(addMovieRx(movieData));
      setIsMovieAdded(true);
    }
  }, [movieData, isMovieAdded, dispatch]);

  if (movieDataLoading) {
    return (
      <div className="h-72 w-full animate-pulse rounded-md bg-card-background" />
    );
  }

  if (!movieData) return null;

  const imagePath = getImagePath(movieData.backdrop_path || movieData.poster_path);

  function handleMovieCard() {
    router.push(`/moviedetails/${movieId}`);
  }

  async function handleDelete(e) {
    e.stopPropagation();
    await deleteMovie({ movieId, watchlistId });
    dispatch(deleteMovieRx(movieData));
  }

  return (
    <>
      <div className="group relative flex h-full flex-col overflow-hidden rounded-md bg-card-background shadow-md transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
        {isOverlayVisible && (
          <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-xs" />
        )}

        {type === "showWatchlist" && (
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-2">
            <button
              onClick={handleDelete}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-red-500 transition hover:bg-black hover:text-red-400"
              aria-label="Remove movie from watchlist"
            >
              <CircleX size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOverlayVisible(!isOverlayVisible);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-green-500 transition hover:bg-black hover:text-green-400"
              aria-label="Toggle watched status"
            >
              <Check size={20} />
            </button>
          </div>
        )}

        <div
          className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden bg-score-background"
          onClick={handleMovieCard}
        >
          {imagePath ? (
            <Image
              src={imagePath}
              alt={movieData.title || "Movie thumbnail"}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-secondary-text">
              No image available
            </div>
          )}
        </div>

        <div
          className="flex flex-1 cursor-pointer flex-col gap-2 p-3 sm:p-4"
          onClick={handleMovieCard}
        >
          <ul className="flex flex-col gap-1.5 text-xs sm:text-sm">
            <li className="line-clamp-1">
              <span className="font-bold text-primary-text">Title: </span>
              <span className="text-[#fab2b2] transition duration-150 group-hover:text-accent-color-900">
                {movieData.title}
              </span>
            </li>
            <li className="line-clamp-1">
              <span className="font-bold text-primary-text">Genre: </span>
              <span className="text-[#fab2b2]">
                {movieData.genres && movieData.genres.length > 0
                  ? movieData.genres.map((g) => g.name).join(", ")
                  : "N/A"}
              </span>
            </li>
            <li className="line-clamp-1">
              <span className="font-bold text-primary-text">Director: </span>
              <span className="text-[#fab2b2]">
                {directorname || "No Data"}
              </span>
            </li>
          </ul>

          <div className="mt-auto flex items-center justify-end gap-1.5 pt-2">
            <p className="text-xs sm:text-sm font-semibold text-[#fab2b2]">
              {movieData.vote_average ? movieData.vote_average.toFixed(1) : "N/A"}/10
            </p>
            <FaImdb className="text-xl sm:text-2xl text-yellow-500" />
          </div>
        </div>

        {type !== "showWatchlist" && (
          <button
            className="btn mt-auto rounded-none rounded-b-md px-2.5 py-2 text-xs sm:text-sm font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            Add to Watchlist
          </button>
        )}
      </div>

      {isModalOpen && (
        <AddMovieModal
          movieId={movieData.id}
          movieName={movieData.title}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default MovieCard;
