import React, { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import "./styles.css";
interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <div className="searchIcon input-group">
        <input
          className="pesquisa rounded-end me-1"
          type="search"
          placeholder="Encontre Imoveis"
          aria-label="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon style={{ color: "#0d6efd", width: "10%" }} />
      </div>
    </form>
  );
};

export default SearchBar;
