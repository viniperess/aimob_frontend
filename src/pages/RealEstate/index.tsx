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
  faRuler,
  faShower,
  faUtensils,
  faCouch,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import { Row, Col } from "react-bootstrap";
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
                  <h3 className="card-text py-3  mb-2">
                    Bairro {realEstate.district}, {realEstate.city} -{" "}
                    {realEstate.state}
                  </h3>
                  <p className="card-text mb-3">
                    Rua {realEstate.street}, {realEstate.number}
                    {realEstate.complement &&
                      `, ${realEstate.complement}`}, {realEstate.zipCode}
                  </p>
                  <Row className="py-3 mb-4">
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faBed} className="me-2" />
                        {realEstate.bedrooms}{" "}
                        {realEstate.bedrooms === "1" ? "quarto" : "quartos"}
                      </p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faShower} className="me-2" />
                        {realEstate.bathrooms}{" "}
                        {realEstate.bathrooms === "1"
                          ? "banheiro"
                          : "banheiros"}
                      </p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faRuler} className="me-2" />
                        {realEstate.totalArea} m²
                      </p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faCar} className="me-2" />
                        {realEstate.garage ? "1" : "0"} vaga
                      </p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faUtensils} className="me-2" />
                        {realEstate.kitchens}{" "}
                        {realEstate.kitchens === "1" ? "cozinha" : "cozinhas"}
                      </p>
                    </Col>
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faCouch} className="me-2" />
                        {realEstate.livingRooms}{" "}
                        {realEstate.livingRooms === "1"
                          ? "sala de estar"
                          : "salas de estar"}
                      </p>
                    </Col>
                  </Row>
                  <div className="text-left py-3 mb-4">
                    <h4 className="text-primary">R$ {realEstate.salePrice}</h4>
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
