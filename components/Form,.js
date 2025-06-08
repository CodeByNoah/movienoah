"use client";
import React, { useEffect, useState } from "react";
import WatchlistMovies from "@/components/WatchlistMovies";
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

  const { mutate: watchlistDelete, isLoading: isDeletingWatchlist } =
    useMutation({
      mutationFn: ({ watchlistId }) => deleteWatchlistapi({ watchlistId }),
      onSuccess: () => {
        console.log("watchlist is deleted");
        router.push("/");
        queryClient.invalidateQueries(["userWatchlist"]);
      },
      onError: (error) => console.log(error),
    });

  const { mutate: createWatchlist, isLoading: createWatchlistLoading } =
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

  const { mutate: updateWatchlist, isLoading: updataWatchlistLoading } =
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
      setName(watchlistData.name);
      setDescription(watchlistData.description);
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
      await deletedMovies.forEach((deletedMovie) => {
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
  if (!watchlistData && type === "edit") {
    return <div>loading ... </div>;
  }
  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-12 text-2xl font-bold">
          {" "}
          {type === "create" ? "ساختن لیست تماشا" : "ویرایش لیست تماشا"}
        </h2>
        {type !== "create" && (
          <p
            onClick={() => watchlistDelete({ watchlistId })}
            className="mb-10 cursor-pointer text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
          >
            حذف لیست تماشا
          </p>
        )}
      </div>
      <form className="flex flex-col" action="">
        <label className="mb-1 font-bold" htmlFor="name">
          {" "}
          نام
        </label>
        <input
          className="mb-8 h-11 rounded-md border bg-transparent px-2.5 py-1"
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
        />
        <label className="mb-1 font-bold" htmlFor="description">
          {" "}
          توضیحات
        </label>
        <textarea
          className="mb-8 h-40 resize-none rounded-md border bg-transparent px-2.5 py-1"
          // className="watchlistcreat-input desc--input"
          type="text"
          id="description"
          value={description}
          onChange={handleDescriptionChange}
        />
        {type === "create" ? (
          <button
            className="btn w-2/12 py-3"
            type={"submit"}
            onClick={handleSubmit}
          >
            {" "}
            ساخت لیست تماشا
          </button>
        ) : (
          <>
            <h4 className="mb-2.5 text-lg font-bold">فیلم‌ها</h4>
            <div>
              {watchlistData.movies ? (
                watchlistData.movies.map((movie, index) => (
                  <WatchlistMovies
                    key={index}
                    movieId={movie}
                    setDeletedMovies={setDeletedMovies}
                  />
                ))
              ) : (
                <div>-this watchlist dont have any movie-</div>
              )}
            </div>

            <button
              className="btn w-2/12 py-3"
              type={"submit"}
              onClick={handleSubmit}
            >
              ذخیره
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default Form;
