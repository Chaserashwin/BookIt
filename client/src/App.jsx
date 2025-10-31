import React, { useState } from "react";
import Header from "./components/Header";
import { Outlet } from "react-router";
import SearchContext from "./utils/SearchContext";

const App = () => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <div>
        <Header />
        <Outlet />
      </div>
    </SearchContext.Provider>
  );
};

export default App;
