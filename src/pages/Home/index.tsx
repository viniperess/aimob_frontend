import React, { useEffect, useState } from "react";
import { RealEstateType } from "../../types/realEstate";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import api from "../../service/api";
import "./styles.css";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower, faRuler } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [loading, setLoading] = useState(true);

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      setRealEstates([...response.data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRealEstates();
  }, []);

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="row my-4">
          <h2 className="col-1 mx-4">Imóveis</h2>
          <a href="/create_realestate" className="col-2 my-1 btn btn-primary">
            Adicionar Imóvel
          </a>
        </div>
        <div className="main-content row m-3 mb-1">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          ) : realEstates.length === 0 ? (
            <p className="text-center w-100">Nenhum imóvel disponível.</p>
          ) : (
            realEstates
              .sort((a, b) => a.id - b.id)
              .map((realEstate) => (
                <div className="col mb-1" key={realEstate.id}>
                  <div className="card">
                    <a href={`/realEstate/${realEstate.id}`}>
                      <img
                        src={realEstate.images[0]}
                        className="card-img"
                        alt={realEstate.description}
                      />
                      <div className="card-img-overlay text-white d-flex justify-content-between align-items-start my-auto mx-auto">
                        <h6 className="card-title-h5 text-white">DESTAQUE</h6>
                        <p className="card-text-comprar">COMPRAR</p>
                      </div>
                    </a>
                    <div className="card-body border secundary text-left">
                      <h5 className="card-title text-left">
                        {realEstate.description}
                      </h5>
                      <p className="card-text">
                        <small className="text-body">
                          Bairro {realEstate.district}
                        </small>
                      </p>
                      <div className="d-flex text-left">
                        <p
                          className="card-text"
                          style={{ marginRight: "20px", opacity: 0.9 }}
                        >
                          <span className="m-1">
                            <FontAwesomeIcon icon={faBed} />
                          </span>
                          {realEstate.bedrooms}
                        </p>
                        <p
                          className="card-text"
                          style={{ marginRight: "20px", opacity: 0.9 }}
                        >
                          <span className="m-1">
                            <FontAwesomeIcon icon={faShower} />
                          </span>
                          {realEstate.bathrooms}
                        </p>
                        <p
                          className="card-text"
                          style={{ marginRight: "20px", opacity: 0.9 }}
                        >
                          <span className="m-1">
                            <FontAwesomeIcon icon={faRuler} />
                          </span>
                          {realEstate.totalArea}m²
                        </p>
                      </div>
                      <div className="text-left">
                        <h5 className="text-primary">
                          R$ {realEstate.salePrice}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
