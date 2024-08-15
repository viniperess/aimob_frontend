import React, { FormEvent, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${query}`);
  };

  return (
    <form className="d-flex mx-auto" role="search" onSubmit={handleSearch}>
      <div className="searchIcon input-group">
        <input
          className="pesquisa rounded-end text-light  me-1"
         
          type="search"
          placeholder="Encontre Imoveis"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn text-light btn-outline-info rounded bg-primary " 
          type="submit"
        >
          Pesquisar
        </button>
        <MagnifyingGlassIcon style={{ color: "#0d6efd", width: "10%" }} />
      </div>
    </form>
  );
};

export default SearchBar;