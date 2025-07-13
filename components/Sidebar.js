"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import { Ellipsis, History, House } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useUserWhatchlist from "@/hooks/useUserWhatchlist";
import { infoReset } from "@/redux/slices/watchlistSlice";
import { supabase } from "@/_lib/supabaseClient";
import {
  addToUser,
  addToUserEmail,
  addToUserId,
  addToUserName,
} from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getUserWatchlistsApi } from "@/api/apiWatchlist";
import { getUserName } from "@/api/apiUser";

function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        console.log(data.user);

        dispatch(addToUserId(data.user.id));
        dispatch(addToUserEmail(data.user.email));
      }
    };
    getUser();
  }, []);

  const userId = useSelector((state) => state.userStore.user.id);

  const { watchlists, error } = useUserWhatchlist(userId);

  const { data: name, NameError } = useQuery({
    queryFn: () => getUserName(userId),
    queryKey: ["userName"],
    enabled: !!userId,
  });

  if (error) return error;

  if (NameError) return NameError;

  dispatch(addToUserName(name));

  function handlerNvigate(watchlistId) {
    event.preventDefault();

    dispatch(infoReset());
    console.log(watchlists);

    router.push(`/watchlistdetails/${watchlistId}`);
  }

  return (
    <div className="flex h-screen flex-col overflow-y-hidden bg-black py-[1.875rem] pl-[2.75rem] pr-[1.25rem]">
      <h1
        className="mb-5 cursor-pointer text-2xl font-bold text-accent-color-900 hover:text-accent-color-500"
        onClick={() => router.push("/")}
      >
        تماشا خانه
      </h1>
      <SearchInput />
      <ul className="mt-10 flex flex-col gap-5">
        <li
          onClick={() => router.push("/")}
          className="flex cursor-pointer items-center justify-start gap-2 rounded-md px-3 py-2.5 transition duration-150 hover:bg-card-background"
        >
          <House />
          <a href="">خانه</a>
        </li>
        <li
          className="flex cursor-pointer items-center justify-start gap-2 rounded-md px-3 py-2.5 transition duration-150 hover:bg-card-background"
          onClick={() => router.push("/history")}
        >
          <History />
          <a href="">تاریخ</a>
        </li>
      </ul>
      <button
        onClick={() => router.push("/createwatchlist")}
        className="btn mt mt-8"
      >
        {" "}
        ساخت لیست تماشا
      </button>
      <ul className="mt-5 border-t border-t-[rgba(217,217,217,0.3)] text-secondary-text">
        <h2 className="my-5 text-lg">لیست‌های من </h2>

        {watchlists
          ? watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                onClick={() => handlerNvigate(watchlist.id)}
                className="flex cursor-pointer items-center justify-start gap-2 rounded-md px-3 py-2.5 transition duration-150 hover:bg-card-background"
              >
                {watchlist.name}
              </li>
            ))
          : "loading"}
      </ul>
      <div
        onClick={() => router.push("/profileedit")}
        className="mt-auto flex h-11 cursor-pointer items-center justify-start gap-2.5 rounded-md border border-[rgba(217,217,217,0.7)] bg-main-background px-2.5 py-5 transition duration-150 hover:bg-card-background"
      >
        <img
          className="h-8 w-8 rounded-full border-2 border-[rgba(217,217,217,0.7)]"
          src="https://ykhxkcfzqggpcaciqnen.supabase.co/storage/v1/object/public/userfiles/avatars/user.jpg "
          alt=""
        />
        <p>{name}</p>
        <Ellipsis className="mr-auto cursor-pointer hover:text-secondary-text" />
      </div>
    </div>
  );
}

export default Sidebar;
