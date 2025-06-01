import React from "react";

function WatchlistMovies() {
  return (
    <div
      // className={`watchlistMovies-item--container ${isdelete ? "watchlistMovies-item--container-delete" : ""}`}
      className="mb-2.5 flex items-center rounded-sm border"
    >
      <img
        className="ml-4 w-1/12"
        src="https://image.tmdb.org/t/p/w300/kEYWal656zP5Q2Tohm91aw6orlT.jpg"
        alt=""
      />
      <h4 className="watchlistMovies-item-name">
        {/*{movieData.title}*/}
        Black Swan
      </h4>
      <button
        className="ml-5 mr-auto cursor-pointer rounded-md border border-accent-color-900 px-2.5 transition duration-150 hover:bg-accent-color-900"
        // onClick={handleDeleteMovie}
        // disabled={isdelete || mutateDeleteLoading}
      >
        حذف
      </button>
    </div>
  );
}

export default WatchlistMovies;
