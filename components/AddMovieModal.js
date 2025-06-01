import React from "react";
import { X } from "lucide-react";

function AddMovieModal() {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(154,154,154,0.8)]">
      <div className="relative z-10 h-auto w-4/12 rounded-lg bg-[#161616] p-7">
        {/*<HiOutlineX*/}
        {/*  onClick={() => setIsModalOpen(false)}*/}
        {/*  className="addMovieModal__icon"*/}
        {/*/>*/}
        <X
          size={30}
          className="absolute left-1 top-1 cursor-pointer transition duration-150 hover:text-accent-color-900"
        />

        <div className="">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center">
              <span className="ml-5">اضافه کردن فیلم: </span>
              <span className="cursor-pointer text-lg font-bold text-accent-color-500 transition duration-150 hover:text-accent-color-900">
                {" "}
                Black Swan{" "}
              </span>
            </li>
            <li className="addMovieModal-info-li">
              <span className="ml-5">به لیست تماشا :</span>
            </li>
          </ul>
        </div>
        <div className="mt-5 flex w-2/5 flex-col gap-4">
          {/*{watchlists.map((watchlist) => (*/}
          <button
            // key={watchlist.id}
            // onClick={(e) => handlerAddMovie(e, watchlist.id)}
            className="btn bg-black text-primary-text transition duration-150 hover:bg-score-background"
          >
            {/*{watchlist.name}*/}
            لبست اول
          </button>
          {/*))}*/}
          <button
            className="btn"
            // onClick={() => navigate("/watchlistcreat")}
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
