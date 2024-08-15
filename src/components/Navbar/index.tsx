import React, { useEffect, useState } from "react";
// import SearchBar from "../SearchBar";
// import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ReactComponent as Logo } from "../../assets/images/3.svg";
import "./styles.css";
import SearchBar from "../SearchBar";
import { IoIosNotifications } from "react-icons/io";

import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/signin"); // Redireciona para /signin após logout
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
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
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <p className="nav-link" aria-current="page">
                Aimob
              </p>
            </li>
            {/* <li className="nav-item">
              <p className="nav-link active" aria-current="page">
                |
              </p>
            </li> */}
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Imóvel
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/create_contact"
              >
                Contato
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/create_appointment"
              >
                Agendamento
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/tasks"
              >
                Tarefas
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="/signin"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Relatórios
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="/">
                    Painel
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          <ul className="navbar-nav mb-2">
            {/* <form className="d-flex" role="search">
            <SearchBar />
          </form> */}
            <li className="nav-item">
              <a
                className="nav-link"
                id="logoContact"
                aria-current="page"
                href="/realestatescontact"
                style={{ textDecoration: "none" }}
              >
                <FcHome className="icon-large-white" style={{ color: "white", fontSize: "1.5rem", marginBottom: "2px"}} />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/notifications"
              >
                Notificações
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/profile"
              >
                Perfil
              </a>
            </li> */}
        <li className="nav-item dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Perfil
              </a>
              <ul className="dropdown-menu dropdown-menu-end bg-primary">
                <li>
                  <a className="dropdown-item text-white no-hover" href="/profile">
                    Perfil
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider bg-white" /> 
                </li>
                <li>
                  <button className="dropdown-item no-hover text-white" onClick={handleLogout}>
                    Sair
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
