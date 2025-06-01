import React from "react";
import WatchlistMovies from "@/components/WatchlistMovies";
function Form({ type = "create" }) {
  return (
    <>
      <div className="flex justify-between">
        <h2 className="mb-12 text-2xl font-bold">
          {" "}
          {type === "create" ? "ساختن لیست تماشا" : "ویرایش لیست تماشا"}
        </h2>
        {type === "create" && (
          <p
            // onClick={() => watchlistDelete({ watchlistId })}
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
          // value={name}
          // onChange={handleNameChange}
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
          // value={description}
          // onChange={handleDescriptionChange}
        />
        {type === "create" ? (
          <button
            className="btn w-2/12 py-3"
            type={"submit"}
            // onClick={handleSubmit}
          >
            {" "}
            ساخت لیست تماشا
          </button>
        ) : (
          <>
            <h4 className="mb-2.5 text-lg font-bold">فیلم‌ها</h4>
            {/*<div className="watchlistmovies--container">*/}
            {/*  {watchlistData.movies ? (*/}
            {/*    watchlistData.movies.map((movie, index) => (*/}
            {/*      <WatchlistMovies*/}
            {/*        key={index}*/}
            {/*        movieId={movie}*/}
            {/*        setDeletedMovies={setDeletedMovies}*/}
            {/*      />*/}
            {/*    ))*/}
            {/*  ) : (*/}
            {/*    <div>-this watchlist dont have any movie-</div>*/}
            {/*  )}*/}
            {/*</div>*/}
            <div>
              <WatchlistMovies />
              <WatchlistMovies />
              <WatchlistMovies />
              <WatchlistMovies />
            </div>

            <button
              className="btn w-2/12 py-3"
              type={"submit"}
              // onClick={handleSubmit}
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
