import React, { useState } from "react";
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
    return <div>loading...</div>;
  }
  const imagePath = getImagePath(movieData.backdrop_path);

  async function handleDeleteMovie(e) {
    if (!isdelete) {
      setIsdelete((isdelete) => (isdelete = !isdelete));
      await setDeletedMovies((prev) => [...prev, movieData]);
    }
  }

  if (movieDataError) {
    throw movieDataError;
  }

  return (
    <div
      // className={`watchlistMovies-item--container ${isdelete ? "watchlistMovies-item--container-delete" : ""}`}
      className={`mb-2.5 flex items-center rounded-sm border ${isdelete && "hidden"}`}
    >
      <img
        className="ml-4 w-1/12"
        src={`${imagePath} || https://image.tmdb.org/t/p/w300/kEYWal656zP5Q2Tohm91aw6orlT.jpg`}
        alt=""
      />
      <h4 className="watchlistMovies-item-name">{movieData.title}</h4>
      <button
        className="ml-5 mr-auto cursor-pointer rounded-md border border-accent-color-900 px-2.5 transition duration-150 hover:bg-accent-color-900"
        onClick={handleDeleteMovie}
        disabled={isdelete || mutateDeleteLoading}
      >
        حذف
      </button>
    </div>
  );
}

export default WatchlistMovies;
