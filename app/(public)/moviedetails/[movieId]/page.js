"use client";
import React, { useState } from "react";
import ScoreSquere from "@/components/ScoreSquare";
import Image from "next/image";
import Cast from "@/components/Cast";
import Spinner from "@/components/Spinner";
import { fetchDirectorAndCasts, fetchMoviesDetails } from "@/api/apiThemoviedb";
import { useQuery } from "@tanstack/react-query";
import { getImagePath } from "@/utils/dataHelper";
import { useDispatch } from "react-redux";
import { addToHistory } from "@/redux/slices/historySlice";
import AddMovieModal from "@/components/AddMovieModal";

function Page({ params }) {
  const { movieId } = React.use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (movieId) {
      dispatch(addToHistory(movieId));
    }
  }, [movieId, dispatch]);

  const {
    data: moviedata,
    isLoading: moviedataLoading,
    error: movieError,
  } = useQuery({
    queryKey: ["movieDetails", movieId],
    queryFn: () => fetchMoviesDetails(movieId),
  });

  const {
    data: casts,
    error: castsError,
    isLoading: castsLoading,
  } = useQuery({
    queryKey: ["casts", movieId],
    queryFn: () => fetchDirectorAndCasts(movieId, "casts"),
  });

  if (moviedataLoading || castsLoading) {
    return <Spinner size="xl" text="Loading movie details..." fullPage />;
  }

  if (movieError || !moviedata) {
    return (
      <div className="text-accent-color-900">
        Error loading movie details.
      </div>
    );
  }

  const { poster_path, title, runtime, vote_average, overview, genres } =
    moviedata;

  const posterUrl = poster_path
    ? getImagePath(poster_path)
    : "https://image.tmdb.org/t/p/w300/6RDXvT0C9Mvm5FNHGThn4iP8xKH.jpg";

  return (
    <div className="w-full">
      {/* Hero Movie Section */}
      <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-start md:gap-10 lg:gap-12">
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] w-48 sm:w-56 md:w-64 lg:w-72 shrink-0 overflow-hidden rounded-lg shadow-2xl bg-card-background">
          <Image
            src={posterUrl}
            alt={title || "Movie poster"}
            fill
            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 288px"
            priority
            className="object-cover"
          />
        </div>

        {/* Movie Info */}
        <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            {title}
          </h1>

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-3 text-sm sm:text-base text-secondary-text md:justify-start">
            <div className="flex flex-wrap gap-1.5">
              {genres &&
                genres.map((genre, index) => (
                  <span
                    key={genre.id || index}
                    className="text-[#fab2b2]"
                  >
                    {genre.name}
                    {index !== genres.length - 1 ? ", " : ""}
                  </span>
                ))}
            </div>
            {runtime && (
              <>
                <span>•</span>
                <span>{`${Math.floor(runtime / 60)}h ${runtime % 60}m`}</span>
              </>
            )}
          </div>

          <p className="mt-4 sm:mt-6 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-secondary-text">
            {overview || "No overview available for this movie."}
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:justify-start">
            <ScoreSquere
              title={"Score"}
              description={vote_average ? vote_average.toFixed(1) : "N/A"}
            />
            <button
              className="btn px-6 py-3 text-sm sm:text-base shadow-lg"
              onClick={() => setIsModalOpen(true)}
            >
              Add to watchlist
            </button>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10 sm:mt-14">
        <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl font-bold tracking-tight">
          Cast
        </h2>
        {casts && casts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
            {casts.map((cast, index) => (
              <Cast cast={cast} key={cast.id || index} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-secondary-text">No cast information available.</p>
        )}
      </div>

      {/* Add to Watchlist Modal */}
      {isModalOpen && (
        <AddMovieModal
          movieId={movieId}
          setIsModalOpen={setIsModalOpen}
          movieName={title}
        />
      )}
    </div>
  );
}

export default Page;
