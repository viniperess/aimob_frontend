import React, { useEffect, useState, FormEvent } from "react";
import { User } from "../../types/user";
import { RealEstateType } from "../../types/realEstate";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faPenToSquare,
  faRuler,
  faShower,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";

const RealEstate: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [realEstate, setRealEstate] = useState<RealEstateType>();
  const [user, setUser] = useState<User | null>(null);

  console.log(user);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`realestates/${id}`);
        const realEstateData = response.data;
        setRealEstate(realEstateData);

        const userId = realEstateData.userId;
        const userResponse = await api.get(`users/${userId}`);
        const userData = userResponse.data;
        setUser(userData);
      } catch (error) {
        console.error("Erro ao obter imóveis", error);
      }
    };
    fetchData();
  }, [id]);

  const handleEditRealEstate = () => {
    navigate(`/edit_realestate/${realEstate?.id}`);
  };

  const handleDeleteRealEstate = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir seu imóvel? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`realestates/${realEstate?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Delete Real Estate: Erro ao excluir", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      {realEstate && (
        <>
          <h1 className="text-center py-2 my-3">{realEstate?.description}</h1>
          <div className="container shadow my-5 mx-auto">
            <div className="row row-cols-lg-2 row-cols-1">
              <div
                id="carouselExampleCaptionsReal"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div
                  id="carouselExampleIndicators"
                  className="carousel carousel-dark slide"
                >
                  <div className="carousel-indicators">
                    {realEstate?.images.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-label="Slide"
                        aria-current="true"
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner">
                    {realEstate?.images.map((images, index) => (
                      <div
                        key={index}
                        className={`carousel-item${
                          index === 0 ? " active" : ""
                        }`}
                      >
                        <img
                          src={images}
                          className="image-card d-block w-100"
                          alt={realEstate.registration}
                        />
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="card-secondary-real col p-4 border border-1">
                <div className="float-end">
                  <button
                    className="btn text-light bg-primary"
                    type="submit"
                    onClick={() => handleEditRealEstate()}
                  >
                    {""}
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn text-light m-2 bg-warning"
                    type="submit"
                    onClick={handleDeleteRealEstate}
                  >
                    {""}
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="card-body text-left">
                  <h3 className="card-text">
                    <small className="text-left">
                      Bairro {realEstate.district}, &nbsp;{realEstate.city}
                      &nbsp; - {realEstate.state}
                    </small>
                  </h3>
                  <p className="card-text">
                    <small className="text-left">
                      Rua {realEstate.street}
                      &nbsp;{realEstate.number}&nbsp;{realEstate?.complement},
                      {realEstate.zipCode}
                    </small>
                  </p>

                  <div className="d-flex text-left">
                  
                    <p className="card-text align-items-center row">
                      <span className="icon-bed m-1">
                        <FontAwesomeIcon icon={faBed} />
                      </span>
                      {realEstate.bedrooms <= 1
                        ? `${realEstate.bedrooms} quarto`
                        : `${realEstate.bedrooms} quartos`}
                    </p>

                   
                    <p
                      className="card-text align-items-center row"
                    
                    >
                      <span className="m-1">
                        <FontAwesomeIcon icon={faShower} />
                      </span>

                      {realEstate.bathrooms <= 1
                        ? `${realEstate.bathrooms} banheiro`
                        : `${realEstate.bathrooms} banheiros`}
                    </p>

                    
                    <p
                      className="card-text align-items-center row "
                     
                    >
                      <span className="m-1">
                        <FontAwesomeIcon icon={faRuler} />
                      </span>
                      {realEstate.totalArea}m²
                    </p>

                    <p
                      className="card-text align-items-center row"
                     
                    >
                      <span className="m-1">
                        <FontAwesomeIcon icon={faCar} />
                      </span>
                      {realEstate.garage ? "1" : "0"} vaga
                    </p>
                  </div>

                  <div className="text-left float-start">
                    <h5 className="text-primary">R$ {realEstate.salePrice}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default RealEstate;
