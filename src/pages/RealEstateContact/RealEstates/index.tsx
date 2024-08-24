import React, { useEffect, useState } from "react";
import api from "../../../service/api";
import { RealEstateType } from "../../../types/realEstate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower, faRuler } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import FooterContact from "../../../components/FooterContact";
const RealEstateContact: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState<
    RealEstateType[]
  >([]);

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      setRealEstates([...response.data]);
      setFilteredRealEstates([...response.data]);
    } catch (error) {
      console.error("RealEstateContact: GetRealEstates", error);
    }
  };

  const handleSearch = async (query: string) => {
    if (query === "") {
      setFilteredRealEstates(realEstates); // Mostra todos se a pesquisa estiver vazia
    } else {
      try {
        const response = await api.get(`/realestates/search?type=${query}`);
        console.log("Resposta da pesquisa:", response.data);
        setFilteredRealEstates(response.data.length > 0 ? response.data : []);
      } catch (error) {
        console.error("Failed to search real estates", error);
        setFilteredRealEstates([]);
      }
    }
  };

  useEffect(() => {
    getRealEstates();
  }, []);
  return (
    <>
      <div className="hero-image">
        <div className="contact-balloon">
          <div className="logo-column"></div>
          <div className="message-column">
            <p className="text-white">
              Quer anunciar seu imóvel?<br/> {" "}
              Entre em contato: <strong className="text-white">(53) 9999-9999</strong>
            </p>
          </div>
        </div>

        <div className="hero-text">
          <h1 className="hero-title">Aimob</h1>
          <p className="hero-subtitle">
            Seu lugar para encontrar o imóvel dos seus sonhos
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="container d-flex align-items-center flex-wrap">
        <div className="property-container">
        <div className="row col my-3">
          <h1 className="col text-center m-3" style={{fontSize: "3rem", fontWeight: "bold"}}>Imóveis à venda</h1>
        </div>
        <div className="container row justify-content-center mb-2">
          {filteredRealEstates.length === 0 && (
            <>
              <div className="no-results text-center">
                <h2>Sem imóveis disponíveis</h2>
                <p>
                  Não encontramos imóveis para sua busca. Que tal dar uma olhada
                  em outros imóveis disponíveis?
                </p>
              </div>
              <hr className="divider my-4" />
            </>
          )}
          {realEstates.map((realEstate) => (
            <div className="col-md-4 col-sm-6 col-12" key={realEstate.id}>
              <div className="card">
                <a href={`/realEstateByContact/${realEstate.id}`}>
                  <img
                    src={realEstate.images[0]}
                    className="card-img"
                    alt={realEstate.description}
                  />
                  <div className="card-img-overlay text-white d-flex justify-content-between align-items-start">
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
                    {realEstate.bedrooms} <FontAwesomeIcon icon={faBed} /> |{" "}
                    {realEstate.bathrooms} <FontAwesomeIcon icon={faShower} /> |{" "}
                    {realEstate.totalArea}m² <FontAwesomeIcon icon={faRuler} />
                  </p>
                  <div className="text-left">
                    <h5 className="text-primary">R$ {realEstate.salePrice}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>
      <FooterContact />
    </>
  );
};

export default RealEstateContact;
