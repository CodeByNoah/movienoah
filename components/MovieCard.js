"use client";
import React from "react";
import Image from "next/image";
import { FaImdb } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Check, CircleX } from "lucide-react";

function MovieCard({ type }) {
  const router = useRouter();
  return (
    <div className="relative flex cursor-pointer flex-col rounded-md bg-card-background transition duration-300 ease-in-out hover:-translate-y-1 hover:bg-[#9a9a9a]">
      {type === "showWatchlist" && (
        <div className="absolute flex w-full items-center justify-between p-1">
          <CircleX className="cursor-pointer bg-black text-red-500 transition duration-200 hover:text-red-900" />
          <Check className="cursor-pointer bg-black text-green-500 transition duration-200 hover:text-green-900" />

          {/*<IoMdCheckmarkCircle*/}
          {/*  className="movie-status-icon checkmark"*/}
          {/*  onClick={() => setOverlayVisible(!isOverlayVisible)}*/}
          {/*/>*/}
          {/*<IoMdCloseCircle*/}
          {/*  className="movie-status-icon close"*/}
          {/*  onClick={handlerDelete}*/}
          {/*/>*/}
        </div>
      )}
      <Image
        src={"https://image.tmdb.org/t/p/w300/eDLp4uFdqP1gpy9oMrutwH6Q64I.jpg"}
        alt=""
        width={300}
        height={400}
        className="rounded-t-md"
        onClick={() => router.push("moviedetails/1212")}
      />
      <div className="flex flex-col gap-2.5 p-4">
        <ul className="flex flex-col gap-2.5">
          <li className="moviecard-info-li">
            <span className="ml-0.5 font-bold">نام:</span>
            <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
              black swan
            </span>
          </li>{" "}
          <li className="ml-0.5">
            <span className="ml-0.5 font-bold">ژانر:</span>{" "}
            <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
              thriller
            </span>
          </li>
          <li className="moviecard-info-li">
            <span className="ml-0.5 font-bold">کارگردان:</span>{" "}
            <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
              arnofsky
            </span>
          </li>
        </ul>
        <div className="flex items-center justify-end gap-2">
          <p className="text-[#fab2b2]">8.8/10</p>
          <FaImdb className="text-2xl text-yellow-500" />
        </div>
      </div>
      <button className="btn rounded-none rounded-b-sm px-2.5">
        اضافه به لیست تماشا
      </button>
    </div>
  );
}

export default MovieCard;
