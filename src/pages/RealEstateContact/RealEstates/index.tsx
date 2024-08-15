import React, { useEffect, useState } from "react";
import api from "../../../service/api";
import { RealEstateType } from "../../../types/realEstate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower, faRuler } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../components/Loading";
import "./styles.css";
import SearchBar from "../../../components/SearchBar";
const RealEstateContact: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      setRealEstates([...response.data]);
    } catch (error) {
      console.error("RealEstateContact: GetRealEstates", error);
    }
  };

  useEffect(() => {
    getRealEstates();
  }, []);
  return (
    <>
      <div className="hero-image">
        <div className="hero-text">
          <h1 className="hero-title">Aimob</h1>
          <p className="hero-subtitle">
            Seu lugar para encontrar o imóvel dos seus sonhos
          </p>
          <SearchBar />
        </div>
      </div>
      <div className="container d-flex align-items-center flex-wrap">
        <div className="row col  my-3">
          <h1 className="col text-center m-4">Imóveis à venda</h1>
        </div>
        <div className="container row justify-content-center mb-2">
          {realEstates.length === 0
            ? (console.log("Sem dados disponíveis"),
              [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />))
            : realEstates
                .sort((a, b) => a.id - b.id)
                .map((realEstate) => (
                  <div className="col-md-4 col-sm-6 col-12" key={realEstate.id}>
                    <div className="card">
                      <a href={`/realEstateByContact/${realEstate.id}`}>
                        <img
                          src={realEstate.images[0]}
                          className="card-img"
                          alt={realEstate.description}
                        />
                        <div className="card-img-overlay  text-white d-flex justify-content-between align-items-start">
                          <h6 className="card-title-h5 text-white">DESTAQUE</h6>
                          <p className="card-text-comprar">COMPRAR</p>
                        </div>
                      </a>
                      <div className="card-body border secundary text-left">
                        <h5 className="card-title text-left">
                          {realEstate.street}, {realEstate.number}
                        </h5>
                        <p className="card-text text-left">
                          {realEstate.city} - {realEstate.state}
                        </p>
                        <p className="card-text text-left">
                          {realEstate.bedrooms} <FontAwesomeIcon icon={faBed} />{" "}
                          | {realEstate.bathrooms}{" "}
                          <FontAwesomeIcon icon={faShower} /> |{" "}
                          {realEstate.builtArea}{" "}
                          <FontAwesomeIcon icon={faRuler} />
                        </p>
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
    </>
  );
};

export default RealEstateContact;
