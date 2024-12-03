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
  const [selectedRealEstates, setSelectedRealEstates] = useState<Set<number>>(
    new Set()
  );

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      const sortedRealEstates = response.data.sort(
        (a: RealEstateType, b: RealEstateType) => {
          if (a.status === b.status) {
            return b.viewsCount - a.viewsCount;
          }
          return a.status ? -1 : 1;
        }
      );
      setRealEstates(sortedRealEstates);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRealEstates();
  }, []);
  const toggleSelection = (id: number) => {
    const updatedSelection = new Set(selectedRealEstates);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
    } else {
      updatedSelection.add(id);
    }
    setSelectedRealEstates(updatedSelection);
  };

  const updateRealEstateStatus = async (status: boolean) => {
    try {
      const promises = Array.from(selectedRealEstates).map((id) =>
        api.patch(`/realestates/${id}`, { status })
      );
      await Promise.all(promises);
      getRealEstates();
      setSelectedRealEstates(new Set());
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }

  };

  const formatCurrency = (value: any) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

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
        {selectedRealEstates.size > 0 && (
          <div
            className="d-flex justify-content-end m-3"
            style={{ fontSize: "12px" }}
          >
            <button
              onClick={() => updateRealEstateStatus(true)}
              className="btn btn-primary me-2"
              style={{ fontSize: "12px" }}
            >
              Marcar como Disponível
            </button>
            <button
              onClick={() => updateRealEstateStatus(false)}
              className="btn btn-danger"
              style={{ fontSize: "12px" }}
            >
              Marcar como Indisponível
            </button>
          </div>
        )}
        <div className="main-content row m-3 mb-1 justify-content-center">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          ) : realEstates.length === 0 ? (
            <p className="text-center w-100">Nenhum imóvel disponível.</p>
          ) : (
            realEstates.map((realEstate, index) => (
              <div
                className={`col mb-1 ${!realEstate.status ? "faded-card" : ""}`}
                key={realEstate.id}
              >
                <div className="card" style={{ minHeight: "25rem" }}>
                  <div
                    className="position-absolute"
                    style={{ top: "10px", left: "10px", zIndex: 1 }}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedRealEstates.has(realEstate.id)}
                      onChange={() => toggleSelection(realEstate.id)}
                    />
                  </div>
                  <a href={`/realEstate/${realEstate.id}`}>
                    <img
                      src={realEstate.images[0]}
                      className="card-img"
                      alt={realEstate.description}
                    />
                    <div className="card-img-overlay text-white d-flex justify-content-between align-items-start my-auto mx-auto">
                      <p className="card-text-comprar">COMPRAR</p>
                      {index < 3 && (
                        <h6 className="card-title-h5 text-white">DESTAQUE</h6>
                      )}
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
                        {formatCurrency(realEstate.salePrice)}
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
