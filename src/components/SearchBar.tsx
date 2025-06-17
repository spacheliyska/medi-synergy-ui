import React from "react";
import "../styles/SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Търси лекарства..."
    value={value}
    onChange={onChange}
    className="search-bar"
  />
);

export default SearchBar;
