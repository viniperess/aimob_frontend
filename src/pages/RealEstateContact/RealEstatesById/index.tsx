import React, { useEffect, useState, FormEvent } from "react";
import { RealEstateType } from "../../../types/realEstate";
import { useParams } from "react-router-dom";
import api from "../../../service/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCar,
  faRuler,
  faShower,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../types/user";
import { Modal, Button } from "react-bootstrap";

const RealEstateByContact: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [realEstate, setRealEstate] = useState<RealEstateType>();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  console.log(user);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    taskStatus: "aguardando infos",
    taskDescription: "aguardando mais informações",
    estateId: id ? parseInt(id) : 0,
  });

  const [appointmentData, setAppointmentData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    date: "",
    time: "",
    visitDate: "",
    observation: "",
    taskStatus: "Visita Agendada",
    taskDescription: "visita agendada",
    estateId: id ? parseInt(id) : 0,
  });

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

  const handleShowModal = (content: string) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (modalContent === "Formulário 1") {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        estateId: id ? parseInt(id) : prevState.estateId, 
      }));
    } else if (modalContent === "Formulário 2") {
      setAppointmentData((prevState) => ({
        ...prevState,
        [id]: value,
        estateId: id ? parseInt(id) : prevState.estateId,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (modalContent === "Formulário 2") {
      const visitDate = new Date(
        `${appointmentData.date}T${appointmentData.time}`
      );
  
      const { date, time, ...dataToSend } = appointmentData;
  
      const updatedAppointmentData = {
        ...dataToSend,
        visitDate: visitDate,
        estateId: id ? parseInt(id) : dataToSend.estateId,
      };

      console.log("Dados para enviar:", updatedAppointmentData);
  
      try {
        await api.post(
          "/appointments/create-by-contact",
          updatedAppointmentData
        );
  
        console.log("Dados do Formulário 2 enviados com sucesso");
        setAppointmentData({
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          date: "",
          time: "",
          visitDate: "",
          observation: "",
          taskStatus: "Visita Agendada",
          taskDescription: "visita agendada",
          estateId: id ? parseInt(id) : 0,
        });
        setShowModal(false);
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    } else if (modalContent === "Formulário 1") {
      const updatedFormData = {
        ...formData,
        estateId: id ? parseInt(id) : formData.estateId,
      };

      console.log("Dados para enviar:", updatedFormData);
  
      try {
        await api.post("/contacts/basic", updatedFormData);
  
        console.log("Dados do Formulário 1 enviados com sucesso");
        setFormData({
          name: "",
          email: "",
          phone: "",
          taskStatus: "aguardando infos",
          taskDescription: "aguardando mais informações",
          estateId: id ? parseInt(id) : 0,
        });
        setShowModal(false);
      } catch (error) {
        console.error("Erro ao enviar os dados:", error);
      }
    }
  };


  return (
    <>
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
                <div className="card-body text-left">
                  <h3 className="card-text mb-3">
                    Bairro {realEstate.district}, {realEstate.city} -{" "}
                    {realEstate.state}
                  </h3>
                  <p className="card-text mb-3">
                    Rua {realEstate.street}, {realEstate.number}
                    {realEstate.complement &&
                      `, ${realEstate.complement}`}, {realEstate.zipCode}
                  </p>

                  <div className="d-flex justify-content-between mb-3">
                    <p className="card-text d-flex align-items-center">
                      <FontAwesomeIcon icon={faBed} className="me-2" />
                      {realEstate.bedrooms}{" "}
                      {realEstate.bedrooms === 1 ? "quarto" : "quartos"}
                    </p>
                    <p className="card-text d-flex align-items-center">
                      <FontAwesomeIcon icon={faShower} className="me-2" />
                      {realEstate.bathrooms}{" "}
                      {realEstate.bathrooms === 1 ? "banheiro" : "banheiros"}
                    </p>
                    <p className="card-text d-flex align-items-center">
                      <FontAwesomeIcon icon={faRuler} className="me-2" />
                      {realEstate.totalArea}m²
                    </p>
                    <p className="card-text d-flex align-items-center">
                      <FontAwesomeIcon icon={faCar} className="me-2" />
                      {realEstate.garage ? "1" : "0"} vaga
                    </p>
                  </div>

                  <div className="text-left">
                    <h4 className="text-primary">R$ {realEstate.salePrice}</h4>
                  </div>

                  <div className="mt-4 d-flex">
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal("Formulário 1")}
                      className="me-2"
                    >
                      Obter mais informações
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => handleShowModal("Formulário 2")}
                    >
                      Agendar uma visita
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalContent}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                {modalContent === "Formulário 1" ? (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Digite seu nome"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Digite seu email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Telefone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Digite seu telefone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="taskDescription" className="form-label">
                        Descrição da Tarefa
                      </label>
                      <textarea
                        className="form-control"
                        id="taskDescription"
                        rows={3}
                        placeholder="Digite a descrição da tarefa"
                        value={formData.taskDescription}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <label htmlFor="contactName" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactName"
                        placeholder="Digite seu nome"
                        value={appointmentData.contactName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contactEmail" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="contactEmail"
                        placeholder="Digite seu email"
                        value={appointmentData.contactEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="contactPhone" className="form-label">
                        Telefone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="contactPhone"
                        placeholder="Digite seu telefone"
                        value={appointmentData.contactPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label htmlFor="date" className="form-label">
                          Data da Visita
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          value={appointmentData.date}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="time" className="form-label">
                          Hora da Visita
                        </label>
                        <input
                          type="time"
                          className="form-control"
                          id="time"
                          value={appointmentData.time}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="observation" className="form-label">
                        Observação
                      </label>
                      <textarea
                        className="form-control"
                        id="observation"
                        rows={3}
                        placeholder="Digite uma observação"
                        value={appointmentData.observation}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </>
                )}
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default RealEstateByContact;
