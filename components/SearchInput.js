import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

function SearchInput({ className = "" }) {
  const [searchInput, setSearchInput] = useState();
  const router = useRouter();
  function handelersearch() {
    router.push(`searchresult/${searchInput}`);
  }
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handelersearch();
    }
  }
  return (
    <div
      className={`relative flex items-center justify-between gap-[.125rem] ${className}`}
    >
      <input
        type="text"
        placeholder="سرچ"
        className="h-9 w-full rounded-md border border-[rgba(217,217,217,0.3)] bg-transparent px-3 py-2 text-primary-text"
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        onKeyPress={handleKeyPress}
      />
      <Search
        size={23}
        className="absolute left-2 cursor-pointer text-primary-text transition duration-150 hover:text-secondary-text"
      />
    </div>
  );
}

export default SearchInput;
