"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import {
  Ellipsis,
  History,
  House,
  UserRound,
  Menu,
  PanelLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useUserWhatchlist from "@/hooks/useUserWhatchlist";
import { infoReset } from "@/redux/slices/watchlistSlice";
import { supabase } from "@/_lib/supabaseClient";
import {
  addToUserEmail,
  addToUserId,
  addToUserName,
} from "@/redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { getUserName } from "@/api/apiUser";

function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        dispatch(addToUserId(data.user.id));
        dispatch(addToUserEmail(data.user.email));
      }
    };
    getUser();
  }, [dispatch]);

  const userId = useSelector((state) => state.userStore.user.id);

  const { watchlists, error } = useUserWhatchlist(userId);

  const { data: name, NameError } = useQuery({
    queryFn: () => getUserName(userId),
    queryKey: ["userName", userId],
    enabled: !!userId,
  });

  useEffect(() => {
    if (name) {
      dispatch(addToUserName(name));
    }
  }, [name, dispatch]);

  if (NameError || error) {
    return (
      <div className="text-sm text-red-500">
        Error loading user information or watchlists.
      </div>
    );
  }

  function handlerNavigate(watchlistId) {
    dispatch(infoReset());
    router.push(`/watchlistdetails/${watchlistId}`);
  }

  return (
    <div
      className={`flex h-screen flex-col overflow-x-hidden overflow-y-hidden bg-black py-[1.875rem] transition-all duration-300 ${isCollapsed ? "w-[5rem] px-3" : "w-[20rem] px-[1.25rem]"}`}
    >
      <div
        className={`mb-5 flex items-center ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        <h1
          className={`cursor-pointer overflow-hidden whitespace-nowrap text-2xl font-bold text-accent-color-900 transition-all duration-300 hover:text-accent-color-500 ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"}`}
          onClick={() => router.push("/")}
        >
          MovieNoah
        </h1>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="shrink-0 p-1 text-secondary-text hover:text-primary-text"
        >
          <PanelLeft />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${isCollapsed ? "mb-0 max-h-0 opacity-0" : "mb-5 max-h-[100px] opacity-100"}`}
      >
        <SearchInput />
      </div>

      <ul
        className={`mt-5 flex flex-col gap-5 ${isCollapsed ? "items-center" : ""}`}
      >
        <li
          onClick={() => router.push("/")}
          className={`flex cursor-pointer items-center rounded-md transition-all duration-150 hover:bg-card-background ${isCollapsed ? "h-10 w-10 justify-center p-0" : "gap-3 px-3 py-2.5"}`}
        >
          <House className="shrink-0" />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"}`}
          >
            Home
          </span>
        </li>
        <li
          className={`flex cursor-pointer items-center rounded-md transition-all duration-150 hover:bg-card-background ${isCollapsed ? "h-10 w-10 justify-center p-0" : "gap-3 px-3 py-2.5"}`}
          onClick={() => router.push("/history")}
        >
          <History className="shrink-0" />
          <span
            className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[150px] opacity-100"}`}
          >
            History
          </span>
        </li>
      </ul>

      <div
        className={`relative mt-8 flex ${isCollapsed ? "justify-center" : ""}`}
      >
        <button
          onClick={() => router.push("/createwatchlist")}
          className={`btn flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full transition-all duration-300 ${isCollapsed ? "h-10 w-10 p-0" : "w-full py-2"}`}
        >
          <span
            className={`absolute text-xl font-bold transition-all duration-300 ${isCollapsed ? "opacity-100" : "opacity-0"}`}
          >
            +
          </span>
          <span
            className={`transition-all duration-300 ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"}`}
          >
            Create Watchlist
          </span>
        </button>
      </div>

      <div
        className={`mt-5 flex flex-col overflow-hidden border-t border-t-[rgba(217,217,217,0.3)] text-secondary-text transition-all duration-300 ${isCollapsed ? "max-h-0 opacity-0" : "max-h-[500px] flex-1 opacity-100"}`}
      >
        <h2 className="my-5 whitespace-nowrap text-lg">My Watchlists</h2>

        <ul className="flex w-full flex-col overflow-y-auto">
          {watchlists ? (
            watchlists.map((watchlist) => (
              <li
                key={watchlist.id}
                onClick={() => handlerNavigate(watchlist.id)}
                className="flex w-full cursor-pointer items-center justify-start gap-2 truncate rounded-md px-3 py-2.5 transition duration-150 hover:bg-card-background"
              >
                {watchlist.name}
              </li>
            ))
          ) : (
            <span className="px-3">loading</span>
          )}
        </ul>
      </div>

      <div
        onClick={() => router.push("/profileedit")}
        className={`mt-auto flex h-11 shrink-0 cursor-pointer items-center rounded-md border border-[rgba(217,217,217,0.7)] bg-main-background py-5 transition-all duration-300 hover:bg-card-background ${isCollapsed ? "justify-center border-transparent bg-transparent px-0 hover:bg-transparent" : "justify-start gap-2.5 px-2.5"}`}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[rgba(217,217,217,0.7)] transition-all duration-300 hover:bg-card-background">
          <UserRound size={20} className="text-[rgba(217,217,217,0.7)]" />
        </div>
        <p
          className={`overflow-hidden truncate whitespace-nowrap transition-all duration-300 ${isCollapsed ? "max-w-0 opacity-0" : "max-w-[120px] opacity-100"}`}
        >
          {name}
        </p>
        <Ellipsis
          className={`shrink-0 cursor-pointer overflow-hidden transition-all duration-300 hover:text-secondary-text ${isCollapsed ? "max-w-0 opacity-0" : "ml-auto max-w-[24px] opacity-100"}`}
        />
      </div>
    </div>
  );
}

export default Sidebar;
