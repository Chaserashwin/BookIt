import React, { useContext, useState } from "react";
import SearchContext from "../utils/SearchContext";
import { Link } from "react-router";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const { setSearch } = useContext(SearchContext);
  return (
    <div className="flex justify-between h-[87px] w-[1440px] py-4 px-[124px] bg-[#F9F9F9] shadow-[0px_2px_16px_0px_#0000001A] items-center">
      <div className="w-[100px] h-[55px]">
        <Link to="/">
          <img src="/logo.png" alt="" className="cursor-pointer" />
        </Link>
      </div>
      <div className="w-[443px] h-[42px] gap-x-4">
        <input
          type="text"
          placeholder="Search experiences"
          className="w-[340px] h-[42px] rounded py-3 px-4 bg-[#EDEDED] gap-x-2.5 mr-1"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="w-[87px] h-[42px] rounded-lg bg-[#FFD643] ml-1"
          onClick={() => {
            setSearch(searchText);
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
