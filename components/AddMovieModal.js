"use client";
import React from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import useUserWhatchlist from "@/hooks/useUserWhatchlist";
import useAddToWatchlist from "@/hooks/useAddTowatchlist";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

function AddMovieModal({ movieId, setIsModalOpen, movieName }) {
  const userId = useSelector((state) => state.userStore.user.id);
  const router = useRouter();

  const { watchlists, error } = useUserWhatchlist(userId);
  const { addMovieToWatchlist } = useAddToWatchlist(movieId);

  function handleAddMovie(e, watchlistId) {
    e.preventDefault();
    addMovieToWatchlist({ movieId, watchlistId });
    setIsModalOpen(false);
    alert("Movie added to watchlist!");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
      onClick={() => setIsModalOpen(false)}
    >
      <div
        className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-xl border border-[rgba(217,217,217,0.2)] bg-[#161616] p-5 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-md text-secondary-text transition duration-150 hover:bg-card-background hover:text-primary-text"
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <div className="pr-8">
          <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-secondary-text">
            Add movie to watchlist
          </p>
          <h3 className="mt-1 text-lg sm:text-xl font-bold text-accent-color-500">
            {movieName}
          </h3>
        </div>

        <div className="mt-5 flex-1 overflow-y-auto">
          <p className="mb-2.5 text-xs sm:text-sm font-semibold text-primary-text">
            Choose a watchlist:
          </p>

          {error && (
            <div className="py-2 text-xs text-red-400">
              Error loading watchlists.
            </div>
          )}

          {!watchlists && (
            <div className="py-6 flex items-center justify-center">
              <Spinner size="sm" text="Loading watchlists..." />
            </div>
          )}

          {watchlists && (
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
              {watchlists.length === 0 && (
                <p className="py-2 text-xs text-secondary-text">
                  You don&apos;t have any watchlists yet.
                </p>
              )}
              {watchlists.map((watchlist) => (
                <button
                  key={watchlist.id}
                  onClick={(e) => handleAddMovie(e, watchlist.id)}
                  className="flex w-full items-center justify-between rounded-md border border-[rgba(217,217,217,0.2)] bg-card-background/70 px-4 py-2.5 text-left text-sm font-medium text-primary-text transition hover:border-accent-color-900 hover:bg-card-background"
                >
                  <span className="truncate">{watchlist.name}</span>
                  <span className="text-xs text-accent-color-900 font-bold">+ Add</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-[rgba(217,217,217,0.15)] pt-4">
          <button
            className="btn w-full py-2.5 text-sm sm:text-base font-bold text-center"
            onClick={() => {
              setIsModalOpen(false);
              router.push("/createwatchlist");
            }}
          >
            Create New Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMovieModal;
