import React from "react";
import Image from "next/image";
import { getImagePath } from "@/utils/dataHelper";

function Cast({ cast }) {
  const castPic = getImagePath(cast.profile_path);

  return (
    <div className="cursor-pointer rounded-md bg-card-background">
      <div className="relative h-[300px] w-auto overflow-hidden">
        <Image
          src={
            castPic ||
            "https://image.tmdb.org/t/p/w300/zLcD2UmXJG6m3qOQhNZs13SQRIp.jpg"
          }
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <p className="mx-4 my-2.5 text-lg"> {cast.name} </p>
      {/*<p className="cast-name"> Character: {character}</p>*/}
    </div>
  );
}

export default Cast;
