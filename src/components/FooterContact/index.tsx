import {
  faInstagram,
  faLinkedinIn,
  faGithub,
  faDiscord,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add(faInstagram, faLinkedinIn, faGithub, faDiscord);

const FooterContact: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center">
      {/* Grid container */}
      <div className="container p-4">
        <div className="row">
          {/* Section: Address */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0 text-white">
            <h5 className="text-uppercase">Aimob</h5>
            <p style={{ color: "white" }}>
              Endereço: Praça 20 de Setembro, 455 <br />
              Bairro Fragata, Cidade Pelotas, RS <br />
              Telefone: (53) 9999-9999 <br />
              Email: aimob-ifsul@gmail.com
            </p>
          </div>

          {/* Section: Social media */}
          <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase" style={{ color: "white" }}>
              Redes
            </h5>
            <section className="mb-4">
              {/* Discord */}
              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#6c77f7" }}
                href="https://discord.gg/W2SXNRr7"
                role="button"
              >
                <FontAwesomeIcon icon={faDiscord} />
              </a>

              {/* Instagram */}
              <a
                data-mdb-ripple-init
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#5993eb" }} // Cor oficial do Instagram
                href="https://www.facebook.com/profile.php?id=61568643164281"
                role="button"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>

              {/* Linkedin */}
              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#50a3f7" }}
                href="https://www.linkedin.com/in/vin%C3%ADciusgperes/"
                role="button"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>

              {/* Github */}
              <a
                className="btn text-white btn-floating m-1"
                style={{ backgroundColor: "#6d6d6d" }}
                href="https://github.com/viniperess"
                role="button"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </section>
          </div>

          {/* Section: About */}
          <div className="col-lg-4 col-md-12 mb-4 mb-md-0 text-white">
            <h5 className="text-uppercase">Sobre</h5>
            <p style={{ color: "white" }}>
              Aimob é uma plataforma dedicada a ajudar você a encontrar o imóvel
              dos seus sonhos. Com uma vasta seleção de imóveis à venda,
              garantimos que você encontrará o lar perfeito.
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)", color: "white" }}
      >
        © 2024 Aimob - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default FooterContact;
