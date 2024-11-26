import React from "react";
import "./styles.css";


const NavbarContact: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
      <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContentContact"
          aria-controls="navbarSupportedContentContact"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContentContact">
        <ul className="navbar-nav me-auto pt-3">
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
              <a
                className="nav-link active"
                aria-current="page"
                href="/realestatescontact"
              >
                Voltar
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item align-items-center">
              <span className="nav-link active text-center">
                Acesse Nossa Página no Facebook
              </span>
              <a
                className="btn btn-floating m-1"
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "25px",
                  height: "25px",
                }}
                href="https://www.facebook.com/profile.php?id=61568643164281"
                role="button"
              >
                <span
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontWeight: "bold",
                    color: "#1877f2", 
                    fontSize: "20px",
                    paddingRight: "7px",
                  }}
                >
                  f
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarContact;
