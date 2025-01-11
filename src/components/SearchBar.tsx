import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <form id="search-form">
      <div className="search">
        <div className="search-items">
          <input type="submit" className="corner" value="" />
          <input
            type="text"
            name="search"
            className="round"
            placeholder="Търси лекарство"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
