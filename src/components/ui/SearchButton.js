"use client";

import Image from "next/image";
import { useState } from "react";

const SearchButton = () => {
  const [search, setSearch] = useState("");

  return (
    <form role="search" className="relative">
      <label htmlFor="site-search" className="sr-only">
        Search
      </label>

      <input
        id="site-search"
        type="search"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white ps-[60px] py-1 border-none outline-none placeholder:text-gray-800 xl:w-70 w-50"
      />

      <Image
        src="/icons/search.svg"
        width={24}
        height={24}
        aria-hidden="true"
        className="absolute left-[25px] top-1/2 -translate-y-1/2"
        alt="search icon"
      />
    </form>
  );
};

export default SearchButton;
