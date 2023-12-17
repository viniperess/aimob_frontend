import React, { useEffect, useState } from "react";
// import SearchBar from "../SearchBar";
import {
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { ReactComponent as Logo } from "../../assets/images/3.svg";
import "./styles.css";
import SearchBar from "../SearchBar";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
  };
  console.log(isLoggedIn, handleLogout);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        
          <Logo className="logo" />
           Aimob
        
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/signin">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="btn btn-outline-info text-light pesquisa-borda-branca rounded" href="/create_realestate">
                Inserir Imóvel
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/signin"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
             <a className="navBtns nav-link fw-medium" href="/profile">
                    Perfil
                    <UserCircleIcon />
              </a>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <SearchBar />
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
