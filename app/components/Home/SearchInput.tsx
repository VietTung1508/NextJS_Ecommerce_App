"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const [searchKey, setSearchKey] = useState("");
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchKey("");
    router.push(`/search?q=${searchKey}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-5/6 lg:flex hidden items-center bg-white rounded-md h-8 relative"
    >
      <input
        className="bg-transparent text-black w-full h-full pl-5 text-xs outline-none border-2 border-auth-btn rounded-sm"
        type="text"
        placeholder="Search keywords"
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button
        type="submit"
        className="bg-auth-btn flex justify-center items-center rounded-full p-3 absolute right-minus12"
      >
        <BsSearch type="submit" size="18" />
      </button>
    </form>
  );
};

export default SearchInput;
