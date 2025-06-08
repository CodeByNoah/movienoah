import React from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import useUserWhatchlist from "@/hooks/useUserWhatchlist";
import useAddToWatchlist from "@/hooks/useAddTowatchlist";
import { router } from "next/client";
import { useRouter } from "next/navigation";

function AddMovieModal({ movieId, setIsModalOpen, movieName }) {
  const userId = useSelector((state) => state.userStore.user.id);
  const router = useRouter();

  const { watchlists, error } = useUserWhatchlist(userId);
  const { addMovieToWatchlist, mutateLoading } = useAddToWatchlist(movieId);

  function handlerAddMovie(e, watchlistId) {
    e.preventDefault();

    addMovieToWatchlist({ movieId, watchlistId });
    setIsModalOpen(false);
    alert("Movie added to watchlist");
  }
  if (error) return error;
  if (!watchlists) return <div>loading ... </div>;
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(154,154,154,0.8)]">
      <div className="relative z-10 h-auto w-4/12 rounded-lg bg-[#161616] p-7">
        <X
          onClick={() => setIsModalOpen(false)}
          size={30}
          className="absolute left-1 top-1 cursor-pointer transition duration-150 hover:text-accent-color-900"
        />

        <div className="">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center">
              <span className="ml-5">اضافه کردن فیلم: </span>
              <span className="cursor-pointer text-lg font-bold text-accent-color-500 transition duration-150 hover:text-accent-color-900">
                {movieName}
              </span>
            </li>
            <li className="addMovieModal-info-li">
              <span className="ml-5">به لیست تماشا :</span>
            </li>
          </ul>
        </div>
        <div className="mt-5 flex w-2/5 flex-col gap-4">
          {watchlists.map((watchlist) => (
            <button
              key={watchlist.id}
              onClick={(e) => handlerAddMovie(e, watchlist.id)}
              className="btn bg-black text-primary-text transition duration-150 hover:bg-score-background"
            >
              {watchlist.name}
            </button>
          ))}
          <button
            className="btn"
            onClick={() => router.push("/createwatchlist")}
          >
            {" "}
            ساختن لیست جدید
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMovieModal;
