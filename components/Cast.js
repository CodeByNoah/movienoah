import React from "react";
import Image from "next/image";
import { getImagePath } from "@/utils/dataHelper";

function Cast({ cast }) {
  const castPic = getImagePath(cast.profile_path);

  return (
    <div className="group overflow-hidden rounded-md bg-card-background shadow transition duration-200 hover:-translate-y-1 hover:bg-card-background/80">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-score-background">
        <Image
          src={
            castPic ||
            "https://image.tmdb.org/t/p/w300/zLcD2UmXJG6m3qOQhNZs13SQRIp.jpg"
          }
          alt={cast.name || "Cast profile"}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 15vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="line-clamp-1 px-2.5 py-2 text-center text-xs sm:text-sm font-medium">
        {cast.name}
      </p>
    </div>
  );
}

export default Cast;
