import React, { useEffect, useState } from "react";
import "./styles.css";
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import NotificationDropdown from "../Notification";
import  IconConfig  from "../../assets/images/icons8-configuração-32.png"
const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  console.log(isLoggedIn);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      navigate("/signin");
    }
    setAuthChecked(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userName");
    navigate("/signin");
  };

  if (!authChecked) {
    return null;
  }
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
          <ul className="navbar-nav me-auto pt-1">
            <li className="nav-item">
              <p className="nav-link" aria-current="page">
                Aimob
              </p>
            </li>
            <li className="nav-item">
              <p className="nav-link active" aria-current="page">
                |
              </p>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Imóvel
              </a>
            </li>
            {/* <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/create_contact"
              >
                Contato
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="/create_appointment"
              >
                Agendamento
              </a>
            </li> */}
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
              <NotificationDropdown />

            </li>

        <li className="nav-item dropdown">
              <a
                className="nav-link active dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              <img src={IconConfig} id="imgConfig" alt="Meu Ícone SVG" width="25" height="25"/>
              </a>
      
              <ul className="dropdown-menu dropdown-menu-end bg-primary"  style={{fontSize: '14px'}}>
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
