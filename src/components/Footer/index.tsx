import React from "react";
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Adicione os ícones que você está usando
// library.add(fab.faFacebookF, fab.faTwitter, fab.faGoogle, fab.faInstagram, fab.faLinkedinIn, fab.faGithub);

const Footer: React.FC = () => {
  return (

    <footer className="bg-primary text-white text-center">
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Facebook */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "facebook-f"]} /> */}
          </a>

          {/* Twitter */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "twitter"]} /> */}
          </a>

          {/* Google */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "google"]} /> */}
          </a>

          {/* Instagram */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "instagram"]} /> */}
          </a>

          {/* Linkedin */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "linkedin-in"]} /> */}
          </a>

          {/* Github */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
          >
            {/* <FontAwesomeIcon icon={["fab", "github"]} /> */}
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © 2023 Copyright
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
