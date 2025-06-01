import React from "react";
import MovieCard from "@/components/MovieCard";

function Page() {
  return (
    <div>
      <p className="mb-10 cursor-pointer text-left text-accent-color-900 underline transition duration-200 hover:text-accent-color-500">
        {" "}
        Clear History
      </p>
      <div className="grid grid-cols-5 gap-14 gap-y-14">
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Page;
