import React from "react";
import ScoreSquere from "@/components/ScoreSquare";
import Image from "next/image";
import Cast from "@/components/Cast";

function Page() {
  return (
    <>
      <div className="flex items-center justify-start gap-11">
        <Image
          className="moviedetails-img w-1/4 rounded-s"
          src="https://image.tmdb.org/t/p/w300/6RDXvT0C9Mvm5FNHGThn4iP8xKH.jpg"
          alt=""
          width={300}
          height={0}
        />
        <div className="flex flex-col">
          <h2 className="text-3xl font-bold">Black swan</h2>
          <div className="mb-12 flex gap-5">
            <p className="">
              {/*{moviedata.genres.map((genre, index) => (*/}
              <span className="cursor-pointer text-[#fab2b2] transition duration-150 hover:text-accent-color-900">
                action, thrier, drama {/*{genre.name}*/}
                {/*{index !== moviedata.genres.length - 1 ? ", " : ""}*/}
              </span>
            </p>
            <p className="moviedetails-info-duration">
              2h 38m {/*{`${(runtime / 60).toFixed(0)}h ${runtime % 60}m`}*/}
            </p>
          </div>
          <p className="mb-12 w-2/3 text-lg font-bold">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
          </p>
          <div>
            <div className="flex items-center gap-24">
              <ScoreSquere
                title={"Score"}
                // description={vote_average.toFixed(1)}
              />
              <button
                className="btn px-7 py-4"
                // onClick={() => handleAddMovie()}
              >
                {" "}
                Add to watchlist
              </button>
            </div>
          </div>
        </div>
        {/*{isModalOpen && (*/}
        {/*  <AddMovieModal*/}
        {/*    movieId={movieId}*/}
        {/*    setIsModalOpen={setIsModalOpen}*/}
        {/*    movieName={moviedata.title}*/}
        {/*  ></AddMovieModal>*/}
        {/*)}*/}
      </div>
      <p className="mb-2.5 mt-12 text-lg font-bold"> بازیگران</p>
      <div className="grid grid-cols-6 gap-14 gap-y-14">
        <Cast />
        <Cast />
        <Cast />
        <Cast />
      </div>
    </>
  );
}

export default Page;
