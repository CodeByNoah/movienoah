"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";
import {
  Ellipsis,
  History,
  House,
  UserRound,
  PanelLeft,
  X,
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
import { closeMobileSidebar } from "@/redux/slices/uiSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isMobileOpen = useSelector((state) => state.uiStore.isMobileSidebarOpen);

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
    queryKey: ["userName", userId],
    queryFn: () => getUserName(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (name) {
      dispatch(addToUserName(name));
    }
  }, [name, dispatch]);

  function handleNavigate(path) {
    dispatch(closeMobileSidebar());
    router.push(path);
  }

  function handleWatchlistNavigate(watchlistId) {
    dispatch(infoReset());
    dispatch(closeMobileSidebar());
    router.push(`/watchlistdetails/${watchlistId}`);
  }

  if (NameError || error) {
    return (
      <div className="text-sm text-red-500">
        Error loading user information or watchlists.
      </div>
    );
  }

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => dispatch(closeMobileSidebar())}
          className="fixed inset-0 z-40 bg-black/75 backdrop-blur-sm transition-opacity duration-300 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen shrink-0 flex-col overflow-x-hidden overflow-y-hidden bg-black transition-all duration-300 md:static md:z-auto md:translate-x-0 ${
          isMobileOpen
            ? "translate-x-0 shadow-2xl"
            : "-translate-x-full md:translate-x-0"
        } ${
          isCollapsed
            ? "md:w-[5rem] md:px-3"
            : "md:w-[20rem] md:px-[1.25rem]"
        } w-[18rem] px-5 py-6 md:py-[1.875rem]`}
      >
        {/* Header section of sidebar */}
        <div
          className={`mb-5 flex items-center justify-between ${
            isCollapsed ? "md:justify-center" : "md:justify-between"
          }`}
        >
          <h1
            className={`cursor-pointer overflow-hidden whitespace-nowrap text-2xl font-bold text-accent-color-900 transition-all duration-300 hover:text-accent-color-500 ${
              isCollapsed ? "md:max-w-0 md:opacity-0" : "max-w-[160px] opacity-100"
            }`}
            onClick={() => handleNavigate("/")}
          >
            MovieNoah
          </h1>

          <div className="flex items-center gap-1">
            {/* Desktop / Tablet collapse toggle */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden p-1.5 text-secondary-text hover:text-primary-text md:inline-flex rounded-md transition-colors hover:bg-card-background"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <PanelLeft size={20} />
            </button>

            {/* Mobile close button */}
            <button
              onClick={() => dispatch(closeMobileSidebar())}
              className="flex p-1.5 text-secondary-text hover:text-primary-text md:hidden rounded-md transition-colors hover:bg-card-background"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div
          className={`transition-all duration-300 ${
            isCollapsed
              ? "md:mb-0 md:max-h-0 md:opacity-0"
              : "mb-5 max-h-[100px] opacity-100"
          }`}
        >
          <SearchInput onSearchCallback={() => dispatch(closeMobileSidebar())} />
        </div>

        {/* Navigation list */}
        <ul
          className={`mt-3 flex flex-col gap-2 md:gap-4 ${
            isCollapsed ? "md:items-center" : ""
          }`}
        >
          <li
            onClick={() => handleNavigate("/")}
            className={`flex cursor-pointer items-center rounded-md transition-all duration-150 hover:bg-card-background ${
              isCollapsed
                ? "md:h-10 md:w-10 md:justify-center md:p-0 gap-3 px-3 py-2.5"
                : "gap-3 px-3 py-2.5"
            }`}
          >
            <House className="shrink-0" size={20} />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "md:max-w-0 md:opacity-0"
                  : "max-w-[150px] opacity-100"
              }`}
            >
              Home
            </span>
          </li>
          <li
            className={`flex cursor-pointer items-center rounded-md transition-all duration-150 hover:bg-card-background ${
              isCollapsed
                ? "md:h-10 md:w-10 md:justify-center md:p-0 gap-3 px-3 py-2.5"
                : "gap-3 px-3 py-2.5"
            }`}
            onClick={() => handleNavigate("/history")}
          >
            <History className="shrink-0" size={20} />
            <span
              className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                isCollapsed
                  ? "md:max-w-0 md:opacity-0"
                  : "max-w-[150px] opacity-100"
              }`}
            >
              History
            </span>
          </li>
        </ul>

        {/* Create Watchlist Button */}
        <div
          className={`relative mt-6 flex ${
            isCollapsed ? "md:justify-center" : ""
          }`}
        >
          <button
            onClick={() => handleNavigate("/createwatchlist")}
            className={`btn flex items-center justify-center overflow-hidden whitespace-nowrap rounded-full transition-all duration-300 ${
              isCollapsed
                ? "md:h-10 md:w-10 md:p-0 w-full py-2.5"
                : "w-full py-2.5"
            }`}
          >
            <span
              className={`text-xl font-bold transition-all duration-300 ${
                isCollapsed ? "hidden md:inline" : "hidden"
              }`}
            >
              +
            </span>
            <span
              className={`transition-all duration-300 ${
                isCollapsed
                  ? "md:max-w-0 md:opacity-0"
                  : "max-w-[200px] opacity-100"
              }`}
            >
              Create Watchlist
            </span>
          </button>
        </div>

        {/* Watchlists List */}
        <div
          className={`mt-5 flex flex-1 flex-col overflow-hidden border-t border-t-[rgba(217,217,217,0.3)] text-secondary-text transition-all duration-300 ${
            isCollapsed
              ? "md:max-h-0 md:opacity-0"
              : "opacity-100"
          }`}
        >
          <h2 className="my-4 whitespace-nowrap text-base sm:text-lg font-semibold text-primary-text/90">
            My Watchlists
          </h2>

          <ul className="flex w-full flex-1 flex-col overflow-y-auto pr-1 space-y-1">
            {watchlists ? (
              watchlists.map((watchlist) => (
                <li
                  key={watchlist.id}
                  onClick={() => handleWatchlistNavigate(watchlist.id)}
                  className="flex w-full cursor-pointer items-center justify-start gap-2 truncate rounded-md px-3 py-2 text-sm transition duration-150 hover:bg-card-background hover:text-primary-text"
                >
                  <span className="truncate">{watchlist.name}</span>
                </li>
              ))
            ) : (
              <div className="flex items-center justify-center py-4">
                <Spinner size="xs" text="Loading..." inline />
              </div>
            )}
          </ul>
        </div>

        {/* Profile User Footer */}
        <div
          onClick={() => handleNavigate("/profileedit")}
          className={`mt-auto flex h-12 shrink-0 cursor-pointer items-center rounded-md border border-[rgba(217,217,217,0.3)] bg-main-background px-3 transition-all duration-300 hover:bg-card-background ${
            isCollapsed
              ? "md:justify-center md:border-transparent md:bg-transparent md:px-0 md:hover:bg-transparent"
              : "justify-start gap-2.5"
          }`}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[rgba(217,217,217,0.7)] transition-all duration-300 hover:bg-card-background">
            <UserRound size={18} className="text-[rgba(217,217,217,0.7)]" />
          </div>
          <p
            className={`overflow-hidden truncate whitespace-nowrap text-sm font-medium transition-all duration-300 ${
              isCollapsed
                ? "md:max-w-0 md:opacity-0"
                : "max-w-[120px] opacity-100"
            }`}
          >
            {name || "User"}
          </p>
          <Ellipsis
            className={`shrink-0 cursor-pointer overflow-hidden transition-all duration-300 hover:text-secondary-text ${
              isCollapsed
                ? "md:max-w-0 md:opacity-0"
                : "ml-auto max-w-[24px] opacity-100"
            }`}
            size={18}
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
