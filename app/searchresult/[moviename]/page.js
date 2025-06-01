import React from "react";
import MovieCard from "@/components/MovieCard";

function Page() {
  return (
    <>
      <h2 className="mb-12 text-2xl font-bold">
        نتیجه سرچ:
        {/*{movieName}*/}
      </h2>

      <div className="grid grid-cols-5 gap-14 gap-y-14">
        {/*{finalresult.map((movie) => (*/}
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        {/*))}*/}
      </div>
    </>
  );
}

export default Page;
