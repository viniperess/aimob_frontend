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
          className="pesquisa form-control rounded-end pesquisa-borda-branca text-light me-2 bg-primary"
         
          type="search"
          placeholder="Encontre Imoveis"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="btn btn-outline-info text-light pesquisa-borda-branca rounded" 
          type="submit"
        >
          Pesquisar
        </button>
        <MagnifyingGlassIcon />
      </div>
    </form>
  );
};

export default SearchBar;