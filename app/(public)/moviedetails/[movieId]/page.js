"use client";
import React from "react";
import ScoreSquere from "@/components/ScoreSquare";

import Image from "next/image";
import Cast from "@/components/Cast";
import { fetchDirectorAndCasts, fetchMoviesDetails } from "@/api/apiThemoviedb";
import { useQuery } from "@tanstack/react-query";
import translator from "@/api/translateApi";
import MovieCard from "@/components/MovieCard";
import { getImagePath } from "@/utils/dataHelper";
import { useDispatch } from "react-redux";
import { addToHistory } from "@/redux/slices/historySlice";

function Page({ params }) {
  const { movieId } = React.use(params);

  const dispatch = useDispatch();
  dispatch(addToHistory(movieId));
  const {
    data: moviedata,
    isLoading: moviedataLoading,
    error: movieError,
  } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => fetchMoviesDetails(movieId),
  });
  const {
    data: translatedOverview,
    isLoading: translating,
    error: translateError,
  } = useQuery({
    queryKey: ["translateOverview", moviedata?.overview ?? ""],
    queryFn: () => translator(moviedata.overview),
    enabled: Boolean(moviedata?.overview),
  });

  const {
    data: casts,
    error: castsError,
    isLoading: castsLoading,
  } = useQuery({
    queryKey: ["casts", movieId],
    queryFn: () => fetchDirectorAndCasts(movieId, "casts"),
  });

  if (moviedataLoading || castsLoading || translating) {
    return <div>Loading...</div>;
  }

  const { poster_path, title, runtime, vote_average, overview, genres } =
    moviedata;

  return (
    <>
      <div className="flex items-center justify-start gap-11">
        <Image
          className="moviedetails-img w-1/4 rounded-s"
          src={
            poster_path
              ? getImagePath(poster_path)
              : "https://image.tmdb.org/t/p/w300/6RDXvT0C9Mvm5FNHGThn4iP8xKH.jpg"
          }
          alt=""
          width={300}
          height={0}
        />
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">{title}</h2>
          <div className="mb-12 flex gap-5">
            <p className="">
              {moviedata.genres.map((genre, index) => (
                <span
                  key={index}
                  className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900"
                >
                  {genre.name}
                  {index !== moviedata.genres.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>
            <p className="moviedetails-info-duration">
              {`${(runtime / 60).toFixed(0)}h ${runtime % 60}m`}
            </p>
          </div>
          <p className="mb-12 w-2/3 text-lg font-bold">
            {translating
              ? "در حال بارگذاری ... "
              : translatedOverview || "خطا در ترجمه"}
          </p>
          <div>
            <div className="flex items-center gap-24">
              <ScoreSquere
                title={"Score"}
                description={vote_average.toFixed(1)}
              />
              <button
                className="btn px-7 py-4"
                // onClick={() => handleAddMovie()}
              >
                {" "}
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
        {/*{isModalOpen && (*/}
        {/*  <AddMovieModal*/}
        {/*    movieId={movieId}*/}
        {/*    setIsModalOpen={setIsModalOpen}*/}
        {/*    movieName={moviedata.title}*/}
        {/*  ></AddMovieModal>*/}
        {/*)}*/}
      </div>
      <p className="mb-2.5 mt-12 text-lg font-bold"> بازیگران</p>
      <div className="grid grid-cols-6 gap-14 gap-y-14">
        {casts.map((cast, index) => (
          <Cast cast={cast} key={index} />
        ))}
      </div>
    </>
  );
}

export default Page;
