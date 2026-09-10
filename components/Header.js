"use client";
import React from "react";
import { Menu, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toggleMobileSidebar } from "@/redux/slices/uiSlice";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[rgba(217,217,217,0.15)] bg-black/90 px-4 backdrop-blur-md md:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(toggleMobileSidebar())}
          className="flex h-10 w-10 items-center justify-center rounded-md text-secondary-text transition-colors hover:bg-card-background hover:text-primary-text"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <span
          onClick={() => router.push("/")}
          className="cursor-pointer text-xl font-bold text-accent-color-900 transition-colors hover:text-accent-color-500"
        >
          MovieNoah
        </span>
      </div>

      <button
        onClick={() => router.push("/profileedit")}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(217,217,217,0.5)] transition-colors hover:bg-card-background"
        aria-label="Profile"
      >
        <UserRound size={18} className="text-secondary-text" />
      </button>
    </header>
  );
}

export default Header;
