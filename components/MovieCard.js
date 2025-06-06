"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaImdb } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { Check, CircleX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchDirectorAndCasts, fetchMoviesDetails } from "@/api/api";
import { getImagePath } from "@/utils/dataHelper";
import { addMovieRx, deleteMovieRx } from "@/redux/slices/watchlistSlice";
import { useDispatch } from "react-redux";
import useDeleteMovie from "@/hooks/useDeleteMovie";

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
    return <div>loading...</div>;
  }
  const imagePath = getImagePath(movieData.backdrop_path);

  function handlerMovieCard(e) {
    router.push(`/moviedetails/${movieId}`);
  }
  async function handlerDelete(e) {
    await deleteMovie({ movieId, watchlistId });
    dispatch(deleteMovieRx(movieData));
  }
  return (
    <div className="relative flex cursor-pointer flex-col rounded-md bg-card-background transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#9a9a9a]">
      {isOverlayVisible && (
        <div className="absolute z-10 h-full w-full bg-[rgba(0,0,0,0.7)]"></div>
      )}
      {type === "showWatchlist" && (
        <div className="absolute flex w-full items-center justify-between p-1">
          <CircleX
            onClick={handlerDelete}
            className="z-10 cursor-pointer rounded-full bg-black text-red-500 transition duration-200 hover:text-red-900"
          />
          <Check
            onClick={() => setOverlayVisible(!isOverlayVisible)}
            className="z-10 cursor-pointer rounded-full bg-black text-green-500 transition duration-200 hover:text-green-900"
          />

          {/*<IoMdCheckmarkCircle*/}
          {/*  className="movie-status-icon checkmark"*/}
          {/*  onClick={() => setOverlayVisible(!isOverlayVisible)}*/}
          {/*/>*/}
          {/*<IoMdCloseCircle*/}
          {/*  className="movie-status-icon close"*/}
          {/*  onClick={handlerDelete}*/}
          {/*/>*/}
        </div>
      )}

      <div className="relative w-full">
        <Image
          src={`${imagePath}`}
          alt=""
          width={300}
          height={400}
          className="w-full rounded-t-md"
          onClick={handlerMovieCard}
        />
      </div>
      <div
        className="flex h-full flex-col gap-2.5 p-4"
        onClick={handlerMovieCard}
      >
        <ul className="flex flex-col gap-2.5">
          <li className="moviecard-info-li">
            <span className="ml-0.5 font-bold">نام:</span>
            <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
              {movieData.title}
            </span>
          </li>{" "}
          <li className="ml-0.5">
            <span className="ml-0.5 font-bold">ژانر:</span>{" "}
            {movieData.genres.map((genre, index) => (
              <span
                className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900"
                key={index}
              >
                {" "}
                {genre.name}
                {index !== movieData.genres.length - 1 ? ", " : ""}
              </span>
            ))}
          </li>
          <li className="moviecard-info-li">
            <span className="ml-0.5 font-bold">کارگردان:</span>{" "}
            <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
              {directorname || "No Data"}
            </span>
          </li>
        </ul>
        <div className="mt-auto flex items-center justify-end gap-2">
          <p className="text-[#fab2b2]">
            {movieData.vote_average.toFixed(1)}/10
          </p>
          <FaImdb className="text-2xl text-yellow-500" />
        </div>
      </div>
      {type !== "showWatchlist" && (
        <button className="btn mt-auto rounded-none rounded-b-sm px-2.5">
          اضافه به لیست تماشا
        </button>
      )}
    </div>
  );
}

export default MovieCard;
