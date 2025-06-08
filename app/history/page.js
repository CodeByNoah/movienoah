"use client";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { useDispatch, useSelector } from "react-redux";
import { resetHistory } from "@/redux/slices/historySlice";

function Page() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.historyStore.movies);
  return (
    <div>
      <p
        onClick={() => dispatch(resetHistory())}
        className="mb-10 cursor-pointer text-left text-accent-color-900 underline transition duration-200 hover:text-accent-color-500"
      >
        {" "}
        پاک کردن تاریخچه
      </p>
      <div className="grid grid-cols-5 gap-14 gap-y-14">
        {selector.map((movie, index) => (
          <MovieCard movieId={movie} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Page;
