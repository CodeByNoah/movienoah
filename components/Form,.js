"use client";
import React, { useEffect, useState } from "react";
import WatchlistMovies from "@/components/WatchlistMovies";
import Spinner from "@/components/Spinner";
import {
  createWatchlistapi,
  deleteWatchlistapi,
  getInfo,
  updateWatchlistapi,
} from "@/api/apiWatchlist";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteMovieRx } from "@/redux/slices/watchlistSlice";

function Form({ type = "create" }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deletedMovies, setDeletedMovies] = useState([]);

  const { watchlistId } = useParams();
  const userId = useSelector((state) => state.userStore.user.id);

  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: watchlistData, isLoading } = useQuery({
    queryKey: ["watchlistData", watchlistId],
    queryFn: () => getInfo(watchlistId),
    enabled: type === "edit" && Boolean(watchlistId),
  });

  const { mutate: watchlistDelete, isPending: isDeletingWatchlist } =
    useMutation({
      mutationFn: ({ watchlistId }) => deleteWatchlistapi({ watchlistId }),
      onSuccess: () => {
        router.push("/");
        queryClient.invalidateQueries(["userWatchlist"]);
      },
      onError: (error) => console.log(error),
    });

  const { mutate: createWatchlist, isPending: createWatchlistLoading } =
    useMutation({
      mutationFn: ({ name, description, userId }) =>
        createWatchlistapi({
          watchlistName: name,
          watchlistdescription: description,
          userId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(["userWatchlist"]);
      },
      onError: (error) => console.log(error),
    });

  const { mutate: updateWatchlist, isPending: updataWatchlistLoading } =
    useMutation({
      mutationFn: ({ watchlistId, name, description, movies }) =>
        updateWatchlistapi(watchlistId, name, description, movies),
      mutationKey: ["updateWatchlist"],
      onSuccess: () => {
        queryClient.invalidateQueries(["watchlistData"]);
        queryClient.invalidateQueries(["getwatchlist"]);
      },
    });

  useEffect(() => {
    if (watchlistData) {
      setName(watchlistData.name || "");
      setDescription(watchlistData.description || "");
    }
  }, [watchlistData]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (type === "create") {
      await createWatchlist({ name, description, userId });
      router.push("/");
    } else {
      const finalMovies = watchlistData.movies.filter(
        (movie) =>
          !deletedMovies.some((deletedMovie) => deletedMovie.id === movie),
      );
      deletedMovies.forEach((deletedMovie) => {
        dispatch(deleteMovieRx(deletedMovie));
      });

      await updateWatchlist({
        watchlistId,
        name,
        description,
        movies: finalMovies,
      });

      router.push(`/watchlistdetails/${watchlistId}`);
    }
  }

  if ((!watchlistData || isLoading) && type === "edit") {
    return <Spinner size="xl" text="Loading watchlist details..." fullPage />;
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-6 sm:mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {type === "create" ? "Create Watchlist" : "Edit Watchlist"}
        </h1>
        {type !== "create" && (
          <button
            type="button"
            onClick={() => watchlistDelete({ watchlistId })}
            disabled={isDeletingWatchlist}
            className="inline-flex items-center gap-2 cursor-pointer text-sm sm:text-base font-semibold text-accent-color-900 underline transition duration-200 hover:text-accent-color-500 disabled:opacity-50"
          >
            {isDeletingWatchlist && <Spinner size="xs" color="current" inline />}
            {isDeletingWatchlist ? "Deleting..." : "Delete Watchlist"}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="mb-1.5 text-sm sm:text-base font-bold text-primary-text" htmlFor="name">
          Name
        </label>
        <input
          className="mb-6 h-11 w-full rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          type="text"
          id="name"
          placeholder="e.g. Favorite Sci-Fi Movies"
          value={name}
          required
          onChange={handleNameChange}
        />

        <label className="mb-1.5 text-sm sm:text-base font-bold text-primary-text" htmlFor="description">
          Description
        </label>
        <textarea
          className="mb-6 h-36 w-full resize-none rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2 text-sm sm:text-base text-primary-text focus:border-accent-color-900 focus:outline-none transition-colors"
          id="description"
          placeholder="Describe your watchlist..."
          value={description}
          onChange={handleDescriptionChange}
        />

        {type === "create" ? (
          <button
            className="btn w-full sm:w-auto sm:self-start px-8 py-3 text-sm sm:text-base shadow-lg disabled:opacity-50"
            type="submit"
            disabled={createWatchlistLoading}
          >
            {createWatchlistLoading ? (
              <Spinner size="sm" color="current" inline text="Creating..." />
            ) : (
              "Create Watchlist"
            )}
          </button>
        ) : (
          <>
            <h4 className="mb-3 text-base sm:text-lg font-bold">Movies in Watchlist</h4>
            <div className="mb-6 space-y-2">
              {watchlistData.movies && watchlistData.movies.length > 0 ? (
                watchlistData.movies.map((movie, index) => (
                  <WatchlistMovies
                    key={index}
                    movieId={movie}
                    setDeletedMovies={setDeletedMovies}
                  />
                ))
              ) : (
                <div className="text-sm text-secondary-text">
                  This watchlist has no movies yet.
                </div>
              )}
            </div>

            <button
              className="btn w-full sm:w-auto sm:self-start px-8 py-3 text-sm sm:text-base shadow-lg disabled:opacity-50"
              type="submit"
              disabled={updataWatchlistLoading}
            >
              {updataWatchlistLoading ? (
                <Spinner size="sm" color="current" inline text="Saving..." />
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default Form;
