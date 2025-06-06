"use client";
import SearchInput from "@/components/SearchInput";
import MovieCard from "@/components/MovieCard";
import AddMovieModal from "@/components/AddMovieModal";
import { fetchPopularMovies } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: popularMovies, error } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
  });
  return (
    <>
      <div className="mb-10 rounded-md border border-accent-color-900 p-5">
        <h2 className="mb-9 text-3xl">
          به <span className="text-accent-color-900">تماشاخانه</span> خوش آمدید
        </h2>
        <p className="text-lg">
          جستجوی فیلم‌ها، افزودن آن‌ها به فهرست تماشا و به‌اشتراک‌گذاری با
          دوستان
        </p>
      </div>
      <div className="flex gap-2">
        <SearchInput className={"grow"} />
        <button className="btn">جستجو</button>
      </div>
      <h3 className="my-9 text-2xl"> فیلم‌های پربیننده این روزها</h3>

      <div className="grid grid-cols-4 gap-14 gap-y-14">
        {popularMovies &&
          popularMovies.map((movie) => (
            <MovieCard movieId={movie.id} key={movie.id} />
          ))}
      </div>
      {/*<AddMovieModal />*/}
    </>
  );
}
