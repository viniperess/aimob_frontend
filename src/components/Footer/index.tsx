import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Adicione os ícones que você está usando
library.add(fab.faFacebookF, fab.faTwitter, fab.faGoogle, fab.faInstagram, fab.faLinkedinIn, fab.faGithub, fab.faDiscord);

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center">
      {/* Grid container */}
      <div className="container p-4 pb-0">
        {/* Section: Social media */}
        <section className="mb-4">
          {/* Discord */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#6c77f7" }}  // Cor oficial do Discord
            href="https://discord.gg/W2SXNRr7"
            role="button"
          >
            <FontAwesomeIcon icon={["fab", "discord"]} />
          </a>

          {/* Instagram */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#E4405F" }}  // Cor oficial do Instagram
            href="https://instagram.com/viniperess_"
            role="button"
          >
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>

          {/* Linkedin */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#50a3f7" }}  // Cor oficial do LinkedIn
            href="https://www.linkedin.com/in/vin%C3%ADciusgperes/"
            role="button"
          >
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </a>

          {/* Github */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#ffff" }}  // Cor oficial do GitHub
            href="https://github.com/viniperess"
            role="button"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "white" }}>
        © 2023 Copyright
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
