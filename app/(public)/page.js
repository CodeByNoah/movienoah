"use client";
import React, { useState } from "react";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";
import Spinner from "@/components/Spinner";
import { fetchPopularMovies } from "@/api/apiThemoviedb";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const {
    data: popularMovies,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
  });

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/searchresult/${encodeURIComponent(searchInput.trim())}`);
    }
  }

  return (
    <div className="w-full">
      {/* Welcome Banner */}
      <div className="mb-6 sm:mb-10 rounded-xl border border-accent-color-900/40 bg-card-background/60 p-5 sm:p-7 md:p-8">
        <h2 className="mb-2 sm:mb-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Welcome to <span className="text-accent-color-900">MovieNoah</span>
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-secondary-text">
          Search movies, add them to watchlists, and share with friends.
        </p>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="mb-8 flex w-full max-w-xl flex-col sm:flex-row gap-2.5 sm:gap-3"
      >
        <div className="flex-1">
          <SearchInput />
        </div>
      </form>

      {/* Section Title */}
      <h3 className="mb-5 sm:mb-8 text-xl sm:text-2xl font-bold tracking-tight">
        Popular Movies
      </h3>

      {/* Loading & Error States */}
      {isLoading && (
        <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-[rgba(217,217,217,0.1)] bg-card-background/30 p-8">
          <Spinner size="lg" text="Loading popular movies..." />
        </div>
      )}

      {error && (
        <div className="text-sm sm:text-base text-accent-color-900">
          Failed to load popular movies. Please try again later.
        </div>
      )}

      {/* Movies Grid */}
      {popularMovies && (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {popularMovies.map((movie) => (
            <MovieCard movieId={movie.id} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}
