"use client";
import React from "react";
import MovieCard from "@/components/MovieCard";
import { useQuery } from "@tanstack/react-query";
import { fetchMovieByName } from "@/api/api";

function Page({ params }) {
  const { movieName } = React.use(params);
  console.log(movieName);
  const {
    data: searchresults,
    isLoading: searchresultsLoading,
    error: searchresultsError,
  } = useQuery({
    queryKey: ["searchresults", movieName],
    queryFn: () => fetchMovieByName(movieName),
  });

  if (searchresultsLoading) {
    return <div>loading...</div>;
  }
  if (searchresultsError) {
    return <div>something wrong</div>;
  }

  const finalresult = searchresults.slice(0, 10);

  return (
    <>
      <h2 className="mb-12 text-2xl font-bold">
        نتیجه سرچ:
        {/*{movieName}*/}
      </h2>

      <div className="grid grid-cols-5 gap-14 gap-y-14">
        {finalresult.map((movie) => (
          <MovieCard movieId={movie.id} key={movie.id} />
        ))}
      </div>
    </>
  );
}

export default Page;
