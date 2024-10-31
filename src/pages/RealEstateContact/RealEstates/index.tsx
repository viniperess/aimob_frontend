import React, { useEffect, useState, useRef } from "react";
import api from "../../../service/api";
import { RealEstateType } from "../../../types/realEstate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower, faRuler } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import SearchBar from "../../../components/SearchBar";
import FooterContact from "../../../components/FooterContact";
import AdvancedFilters from "../../../components/AdvancedFilters/AdvancedFilters";

const RealEstateContact: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [filteredRealEstates, setFilteredRealEstates] = useState<
    RealEstateType[]
  >([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [pendingFilters, setPendingFilters] = useState({});
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    kitchens: "",
    livingRooms: "",
    minPrice: 0,
    maxPrice: 1000000,
    type: "",
    garage: "",
    yard: "",
    pool: "",
  });
  const resetFilters = () => {
    const defaultFilters = {
      bedrooms: "",
      bathrooms: "",
      kitchens: "",
      livingRooms: "",
      minPrice: 0,
      maxPrice: 1000000,
      type: "",
      garage: "",
      yard: "",
      pool: "",
    };
    setFilters(defaultFilters);
    setPendingFilters(defaultFilters);
    applyAdvancedSearchFilters(defaultFilters); // Aplica a busca resetada
  };
  const getRealEstates = async () => {
    try {
      console.log("Fetching all real estates");
      const response = await api.get("realestates");
      setRealEstates([...response.data]);
      setFilteredRealEstates([...response.data]);
      console.log("All real estates fetched:", response.data);
    } catch (error) {
      console.error("RealEstateContact: GetRealEstates", error);
    }
  };
  const applyAdvancedSearchFilters = async (
    filtersToApply = pendingFilters
  ) => {
    try {
      const response = await api.get("realestates/advance-search", {
        params: filtersToApply,
      });
      setFilteredRealEstates(response.data.length > 0 ? response.data : []);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Erro ao aplicar filtros avançados:", error);
      setFilteredRealEstates([]);
      setSearchPerformed(true);
    }
  };

  const handleFilterChange = (newFilters: {}) => {
    setPendingFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSearch = async (query: string) => {
    if (query === "") {
      console.log("Resetting search, showing all real estates");
      getRealEstates();
      setSearchPerformed(false);
    } else {
      try {
        console.log("Searching by type:", query);
        const response = await api.get(`/realestates/search?type=${query}`);
        console.log("Search results by type:", response.data);
        setFilteredRealEstates(response.data.length > 0 ? response.data : []);
        setSearchPerformed(true);
      } catch (error) {
        console.error("Failed to search real estates by type", error);
        setFilteredRealEstates([]);
        setSearchPerformed(true);
      }
    }
  };

  const handleSearchBarClick = () => {
    if (searchBarRef.current) {
      const elementPosition =
        searchBarRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition + 150;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
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
              Quer anunciar seu imóvel?
              <br /> Entre em contato:{" "}
              <strong className="text-white">(53) 9999-9999</strong>
            </p>
          </div>
        </div>

        <div
          className="hero-text"
          ref={searchBarRef}
          onClick={handleSearchBarClick}
        >
          <h1 className="hero-title">Aimob</h1>
          <p className="hero-subtitle">
            Seu lugar para encontrar o imóvel dos seus sonhos
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "-5px",
          backgroundColor: "#f8f9fa",
          border: "1px solid #ddd",
          borderTop: "none",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          style={{
            width: "100%",
            padding: "10px 0",
            backgroundColor: "#0d6efd",
            color: "#fff",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: showAdvancedFilters ? "0" : "0 0 8px 8px",
          }}
        >
          {showAdvancedFilters
            ? "Recolher Filtros"
            : "Exibir Filtros Avançados"}
        </button>

        {showAdvancedFilters && (
          <div style={{ backgroundColor: "#0d6efd" }}>
            <AdvancedFilters
              onFilterChange={handleFilterChange}
              resetFilters={resetFilters}
            />
            <button
              onClick={() => {
                console.log("Applying filters on button click");
                applyAdvancedSearchFilters();
              }}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Aplicar Filtros
            </button>
          </div>
        )}
      </div>

      <div className="container d-flex align-items-center flex-column">
        <div className="property-container">
          <div className="row col my-3">
            <h1
              className="col text-center m-3"
              style={{ fontSize: "3rem", fontWeight: "bold" }}
            >
              Imóveis à venda
            </h1>
          </div>

          <div
            className={
              "container row justify-content-center align-items-center  mb-2"
            }
          >
            {searchPerformed && (
              <div
                className="search-results text-center w-100"
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "20px",
                  borderRadius: "5px",
                }}
              >
                <h2 className="justify-content-center text-center">
                  {filteredRealEstates.length > 0
                    ? `${filteredRealEstates.length} ${
                        filteredRealEstates.length === 1
                          ? "imóvel encontrado"
                          : "imóveis encontrados"
                      }`
                    : "Sem imóveis disponíveis"}
                </h2>
                <p>
                  {filteredRealEstates.length > 0
                    ? "Aqui estão os imóveis que correspondem à sua busca:"
                    : "Não encontramos imóveis para sua busca. Que tal dar uma olhada em outros imóveis disponíveis?"}
                </p>
                <hr className="divider my-4" />
              </div>
            )}

            {filteredRealEstates.length > 0
              ? filteredRealEstates.map((realEstate) => (
                  <div
                    className={`${
                      filteredRealEstates.length === 1
                        ? "col-12"
                        : "col-md-4 col-sm-6 col-12"
                    } d-flex justify-content-center`}
                    key={realEstate.id}
                  >
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
                          {realEstate.bedrooms} <FontAwesomeIcon icon={faBed} />{" "}
                          | {realEstate.bathrooms}{" "}
                          <FontAwesomeIcon icon={faShower} /> |{" "}
                          {realEstate.totalArea}m²{" "}
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
                ))
              : realEstates.map((realEstate) => (
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
                          {realEstate.bedrooms} <FontAwesomeIcon icon={faBed} />{" "}
                          | {realEstate.bathrooms}{" "}
                          <FontAwesomeIcon icon={faShower} /> |{" "}
                          {realEstate.totalArea}m²{" "}
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
      </div>
      <FooterContact />
    </>
  );
};

export default RealEstateContact;
