"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function SearchInput({ className = "", onSearchCallback }) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  function handleSearch() {
    const trimmed = searchInput ? searchInput.trim() : "";
    if (trimmed) {
      if (onSearchCallback) {
        onSearchCallback();
      }
      router.push(`/searchresult/${encodeURIComponent(trimmed)}`);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  }

  return (
    <div
      className={`relative flex w-full items-center justify-between ${className}`}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={searchInput}
        className="h-10 w-full rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent pl-3 pr-10 text-sm text-primary-text placeholder:text-secondary-text focus:border-accent-color-900 focus:outline-none transition-colors"
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-1 flex h-8 w-8 items-center justify-center text-secondary-text hover:text-primary-text transition-colors"
        aria-label="Submit search"
      >
        <Search size={18} />
      </button>
    </div>
  );
}

export default SearchInput;
