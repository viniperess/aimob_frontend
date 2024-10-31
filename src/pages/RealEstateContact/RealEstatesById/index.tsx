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
  faUtensils,
  faCouch,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTree,
  faSwimmingPool,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../types/user";
import { Modal, Button, Row, Col } from "react-bootstrap";
import FooterContact from "../../../components/FooterContact";
import InputMask from "react-input-mask";
import "./styles.css";
const RealEstateByContact: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [realEstate, setRealEstate] = useState<RealEstateType>();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<string>("");
  const [formError, setFormError] = useState("");
  const [appointmentError, setAppointmentError] = useState("");
  console.log(user);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    taskStatus: "Aguardando mais Informações",
    taskDescription: "Aguardando mais Informações",
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
    taskDescription: "Agendando Visita",
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
    if (modalContent === "Formulário Informações") {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
        estateId: id ? parseInt(id) : prevState.estateId,
      }));
    } else if (modalContent === "Formulário Agendamento") {
      setAppointmentData((prevState) => ({
        ...prevState,
        [id]: value,
        estateId: id ? parseInt(id) : prevState.estateId,
      }));
    }
  };

  const errorMessages = {
    "Appointment with this date not available":
      "Horário indisponível para visita.",
    "Email already exists.": "O e-mail já está cadastrado.",
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (modalContent === "Formulário Agendamento") {
      const visitDate = `${appointmentData.date}T${appointmentData.time}:00-03:00`;
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

        console.log("Dados do Formulário Agendamento enviados com sucesso");
        setAppointmentData({
          contactName: "",
          contactEmail: "",
          contactPhone: "",
          date: "",
          time: "",
          visitDate: "",
          observation: "",
          taskStatus: "Visita Agendada",
          taskDescription: "Agendando Visita",
          estateId: id ? parseInt(id) : 0,
        });
        setAppointmentError("");
        setShowModal(false);
      } catch (error: any) {
        console.error("Erro ao enviar os dados:", error);
        const errorMessage =
          typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : "";
        const translatedErrorMessage =
          errorMessages[errorMessage as keyof typeof errorMessages] ||
          "Erro ao agendar a visita. Tente novamente.";
        setAppointmentError(translatedErrorMessage);
      }
    } else if (modalContent === "Formulário Informações") {
      const updatedFormData = {
        ...formData,
        estateId: id ? parseInt(id) : formData.estateId,
      };

      console.log("Dados para enviar:", updatedFormData);

      try {
        const contactResponse = await api.get(
          `/contacts?email=${formData.email}`
        );
        const existingContact = contactResponse.data;
        if (existingContact) {
          (updatedFormData as any).contactId = existingContact.id;
        }
        await api.post("/contacts/basic", updatedFormData);

        console.log("Dados do Formulário Informações enviados com sucesso");
        setFormData({
          name: "",
          email: "",
          phone: "",
          taskStatus: "Aguardando mais Informações",
          taskDescription: "Aguardando mais informações",
          estateId: id ? parseInt(id) : 0,
        });
        setFormError("");
        setShowModal(false);
      } catch (error: any) {
        console.error("Erro ao enviar os dados:", error);
        const errorMessage =
          typeof error.response?.data?.message === "string"
            ? error.response.data.message
            : "";
        const translatedErrorMessage =
          errorMessages[errorMessage as keyof typeof errorMessages] ||
          "Erro ao enviar as informações. Tente novamente.";
        setFormError(translatedErrorMessage);
      }
    }
  };

  return (
    <>
      {realEstate && (
        <>
          <h1 className="text-center py-3 my-4 page-title">
            {realEstate?.description}
          </h1>
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
              <div className="card-secondary-real col p-4 border border-1  d-flex flex-column justify-content-between">
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
                        <FontAwesomeIcon icon={faBuilding} className="me-2" />
                        {realEstate.type}
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
                    <Col xs={6} md={4}>
                      <p className="card-text d-flex align-items-center">
                        <FontAwesomeIcon icon={faTree} className="me-2" />
                        {realEstate.yard ? "Com jardim" : "Sem jardim"}
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
                        <FontAwesomeIcon
                          icon={faSwimmingPool}
                          className="me-2"
                        />
                        {realEstate.pool ? "Com piscina" : "Sem piscina"}
                      </p>
                    </Col>
                  </Row>
                  <div className="text-left py-3 mb-4">
                    <h4 className="text-primary">R$ {realEstate.salePrice}</h4>
                  </div>

                  <div className="mt-auto d-flex justify-content-start py-4">
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal("Formulário Informações")}
                      className="me-2"
                      style={{ width: "13rem" }}
                    >
                      Obter mais informações
                    </Button>
                    <Button
                      variant="warning"
                      onClick={() => handleShowModal("Formulário Agendamento")}
                      style={{ width: "13rem" }}
                    >
                      Agendar uma visita
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header
              closeButton
              className={`${
                modalContent === "Formulário Agendamento"
                  ? "bg-warning text-white"
                  : "bg-primary text-white"
              }`}
            >
              <Modal.Title>{modalContent}</Modal.Title>
            </Modal.Header>
            <Modal.Body
              className={`${
                modalContent === "Formulário Agendamento"
                  ? "bg-warning text-dark"
                  : "bg-primary text-white"
              }`}
            >
              {appointmentError &&
                modalContent === "Formulário Agendamento" && (
                  <div className="alert alert-danger text-center">
                    {appointmentError}
                  </div>
                )}
              {formError && modalContent === "Formulário Informações" && (
                <div className="alert alert-danger text-center">
                  {formError}
                </div>
              )}
              <div className="row">
                <div className="col-md-10">
                  <form onSubmit={handleSubmit}>
                    {modalContent === "Formulário Informações" ? (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="form-label text-white"
                          >
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
                          <label
                            htmlFor="email"
                            className="form-label text-white"
                          >
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
                          <label
                            htmlFor="phone"
                            className="form-label text-white"
                          >
                            Telefone
                          </label>
                          <InputMask
                            mask="+55 (99) 99999-9999"
                            maskChar={null}
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-control"
                            id="phone"
                            placeholder="Digite seu telefone"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="taskDescription"
                            className="form-label text-white"
                          >
                            Descrição
                          </label>
                          <textarea
                            className="form-control"
                            id="taskDescription"
                            rows={3}
                            placeholder="Digite a descrição"
                            value={formData.taskDescription}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-3">
                          <label
                            htmlFor="contactName"
                            className="form-label text-white"
                          >
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
                          <label
                            htmlFor="contactEmail"
                            className="form-label text-white"
                          >
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
                          <label
                            htmlFor="contactPhone"
                            className="form-label text-white"
                          >
                            Telefone
                          </label>
                          <InputMask
                            mask="+55 (99) 99999-9999"
                            maskChar={null}
                            value={appointmentData.contactPhone}
                            onChange={handleInputChange}
                            className="form-control"
                            id="contactPhone"
                            placeholder="Digite seu telefone"
                            required
                          />
                        </div>

                        <div className="row">
                          <div className="col-md-6">
                            <label
                              htmlFor="date"
                              className="form-label text-white"
                            >
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
                            <label
                              htmlFor="time"
                              className="form-label text-white"
                            >
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
                          <label
                            htmlFor="description"
                            className="form-label text-white"
                          >
                            Descrição
                          </label>
                          <textarea
                            className="form-control"
                            id="description"
                            rows={3}
                            placeholder="Digite uma descrição"
                            value={appointmentData.taskDescription}
                            onChange={handleInputChange}
                            required
                          ></textarea>
                        </div>
                      </>
                    )}
                    <Button variant="light" className="text-dark" type="submit">
                      Enviar
                    </Button>
                  </form>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer
              className={`${
                modalContent === "Formulário Agendamento"
                  ? "bg-warning"
                  : "bg-primary"
              }`}
            >
              <Button variant="secondary" onClick={handleCloseModal}>
                Fechar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      <FooterContact />
    </>
  );
};

export default RealEstateByContact;
