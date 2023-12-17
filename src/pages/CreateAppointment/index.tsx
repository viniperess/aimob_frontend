import React, { FormEvent, useEffect, useState } from "react";
import api from "../../service/api";
import { RealEstateType } from "../../types/realEstate";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Role, User } from "../../types/user";

const fetchRealEstates = async () => {
  try {
    const response = await api.get("/realestates");
    console.log("Real Estates data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching real estates:", error);
    return [];
  }
};
const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log("Users data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const CreateAppointment: React.FC = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [observation, setObservation] = useState("");
  // const [visitDate, setVisitDate] = useState("");
  const [visitApproved, setVisitApproved] = useState(false);
  const [userId, setUserId] = useState("");
  const [clientUserId, setClientUserId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState<User[]>([]);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      console.log("Users Profile data:", response.data);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching users profile:", error);
      return [];
    }
    console.log('====================================');
    console.log(users);
    console.log('====================================');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("Users:", usersData);
        setUsers(usersData);
        const clientsData = usersData.filter(
          (user: User) => user?.roles === Role.CLIENT
        );

        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchRealEstatesData = async () => {
      try {
        const realEstatesData = await fetchRealEstates();
        console.log("Real Estates:", realEstatesData);
        setRealEstates(realEstatesData);
      } catch (error) {
        console.error("Error fetching real estates:", error);
      }
    };
    fetchProfile();
    fetchRealEstatesData();
    fetchData();
  },[]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const visitDate = new Date(`${date}T${time}`);

    try {
      await api.post("/appointments", {
        observation,
        visitDate,
        visitApproved,
        userId: userId,
        clientUserId:
          typeof clientUserId === "number"
            ? clientUserId
            : parseInt(clientUserId, 10),
        estateId:
          typeof estateId === "number" ? estateId : parseInt(estateId, 10),
      });
      console.log("Requisição bem sucedida!");
      navigate("/");
    } catch (error) {
      console.error(
        "HandleSubmit Appointment, Erro ao criar um agendamento.",
        error
      );
    }
  };
  return (
    <>
      <Navbar />
      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Inserir Contrato
      </h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder">
          Formulário de criação de contrato
        </h2>
        <form
          className="row row-cols-lg-auto g-3 align-items-center"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label className="visually-hidden" htmlFor="finalValue">
              Observação
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="finalValueFeedback"
                id="finalValue"
                placeholder="Observacao"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="visitApproved">
              Status
            </label>
            <div className="input-group">
              <div className="input-group-text">?</div>
              <input
                type="checkbox"
                className="form-control"
                aria-describedby="visitApprovedFeedback"
                id="visitApproved"
                placeholder="Status"
                checked={visitApproved}
                onChange={(e) => setVisitApproved(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="visitApproved">
                {visitApproved ? "Sim" : "Não"}
              </label>
            </div>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="visitDate">
              Data da visita
            </label>
            <div className="input-group">
              <div className="input-group-text">?</div>
              <input
                type="date"
                className="form-control"
                aria-describedby="visitDateFeedback"
                id="visitDate"
                placeholder="Data"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="visitTime">
              Hora da visita
            </label>
            <div className="input-group">
              <div className="input-group-text">?</div>
              <input
                type="time"
                className="form-control"
                aria-describedby="visitTimeFeedback"
                id="visitTime"
                placeholder="Hora"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="clientUserId">
              Cliente
            </label>
            <select
              className="form-select"
              id="clientUserId"
              value={clientUserId}
              onChange={(e) => setClientUserId(e.target.value)}
            >
              <option disabled value="">
                Selecione o comprador...
              </option>
              {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client) => (
                  <option value={client?.id} key={client?.id}>
                    {client?.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum cliente disponível
                </option>
              )}
            </select>
          </div>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="estateId">
              Imóvel
            </label>
            <select
              className="form-select"
              id="estateId"
              value={estateId}
              onChange={(e) => setEstateId(e.target.value)}
            >
              <option disabled value="">
                Seleciona o imóvel...
              </option>
              {Array.isArray(realEstates) && realEstates.length > 0 ? (
                realEstates.map((realEstate) => (
                  <option value={realEstate?.id} key={realEstate?.id}>
                    {realEstate?.registration}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum imóvel disponível
                </option>
              )}
            </select>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineFormCheck"
              />
              <label className="form-check-label" htmlFor="inlineFormCheck">
                Concordo com os termos
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateAppointment;
