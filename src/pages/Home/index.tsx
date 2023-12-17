import React, { useEffect, useState } from "react";
import { RealEstateType } from "../../types/realEstate";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import api from "../../service/api";
import "./styles.css";
import Footer from "../../components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faShower, faRuler } from '@fortawesome/free-solid-svg-icons';



const Home: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      console.log(response.data);
      setRealEstates([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRealEstates();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
      <h1 className="text-center  py-3 my-5 mb-5">
          Conheça Nossos Imóveis
        </h1>
        <div className="main-content container row row-cols-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 mx-auto my-auto">
          {realEstates.length === 0
            ? (console.log("Sem dados disponíveis"),
              [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />))
            : realEstates
                .sort((a, b) => a.id - b.id)
                .map((realEstate) => (
                  <div className="col" key={realEstate.id}>
                    <div className="card">
                      <a href={`/realEstate/${realEstate.id}`}>
                        <img
                          src={realEstate.images[0]}
                          className="card-img"
                          alt={realEstate.description}
                        />
                        <div className="card-img-overlay  text-white d-flex justify-content-between align-items-start my-auto mx-auto">
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
                          {/* Ícone e número de quartos */}
                          <p className="card-text"  style={{ marginRight: '20px', opacity:0.9 }}>
                            <span className="m-1">
                            <FontAwesomeIcon icon={faBed} />
                            </span>
                            {realEstate.bedrooms}
                          </p>

                          {/* Ícone e informações do vaso sanitário */}
                          <p className="card-text" style={{ marginRight: '20px', opacity:0.9}}>
                            <span className="m-1">
                            <FontAwesomeIcon icon={faShower} />
                            
                            </span>
                            {realEstate.bathrooms}
                          </p>

                          {/* Ícone e informações da área total */}
                          <p className="card-text" style={{ marginRight: '20px', opacity:0.9}}>
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
                ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
