import { faInstagram, faLinkedinIn, faGithub, faDiscord, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faInstagram, faLinkedinIn, faGithub, faDiscord);

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center">
      <div className="container p-4 pb-0">
      <p className="btn text-white btn-floating m-1">Acesse nossa página no Facebook</p>
        <section className="mb-4">
          {/* Discord */}
          
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#6c77f7" }}  // Cor oficial do Discord
            href="https://discord.gg/W2SXNRr7"
            role="button"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>

          {/* Instagram */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#5993eb" }}  // Cor oficial do Instagram
            href="https://www.facebook.com/profile.php?id=61568643164281"
            role="button"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          {/* Linkedin */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#50a3f7" }}  // Cor oficial do LinkedIn
            href="https://www.linkedin.com/in/vin%C3%ADciusgperes/"
            role="button"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>

          {/* Github */}
          <a
            data-mdb-ripple-init
            className="btn text-white btn-floating m-1"
            style={{ backgroundColor: "#6d6d6d" }}  // Cor oficial do GitHub
            href="https://github.com/viniperess"
            role="button"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
        {/* Section: Social media */}
      </div>
      {/* Grid container */}

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)", color: "white" }}>
        © 2024 Copyright
      </div>
      {/* Copyright */}
    </footer>
  );
};

export default Footer;
