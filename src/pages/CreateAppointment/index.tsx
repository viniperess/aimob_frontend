import React, { FormEvent, useCallback, useEffect, useState } from "react";
import api from "../../service/api";
import { RealEstateType } from "../../types/realEstate";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import './styles.css';
import { Contact } from "../../types/contact";

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

const fetchContacts = async () => {
  try {
    const response = await api.get("/contacts");
    console.log("Contacts data:", response.data);
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
  const [visitApproved, setVisitApproved] = useState(true);
  const [contactId, setContactId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactsData = await fetchContacts();
        console.log("Contacts:", contactsData);
        setContacts(contactsData);
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

    fetchRealEstatesData();
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const visitDate = new Date(`${date}T${time}`);

    try {
      await api.post("/appointments/create-by-corrector", {
        observation,
        visitDate,
        visitApproved,
        contactId: Number(contactId),
        estateId: Number(estateId),
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
      <div className="form-container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="mb-4 text-center">Agendamento de Imóvel</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="visitDate" className="form-label">
                Data da Visita
              </label>
              <input
                type="date"
                className="form-control"
                id="visitDate"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="visitTime" className="form-label">
                Hora da Visita
              </label>
              <input
                type="time"
                className="form-control"
                id="visitTime"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row">
            {" "}
            <div className="col-md-5">
              <label htmlFor="observation" className="form-label">
                Observação
              </label>
              <input
                type="text"
                className="form-control"
                id="observation"
                placeholder="Observação"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required
              />
            </div>
            <div className="col-5">
              <label htmlFor="visitApproved" className="form-label">
                Status
              </label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="visitApproved"
                  checked={visitApproved}
                  onChange={(e) => setVisitApproved(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="visitApproved">
                  {visitApproved ? "Aprovado" : "Não Aprovado"}
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="contactId" className="form-label">
                Contato
              </label>
              <select
                className="form-select"
                id="contactId"
                value={contactId}
                onChange={(e) => setContactId(e.target.value)}
                required
              >
                <option disabled value="">
                  Selecione o comprador...
                </option>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <option value={contact.id} key={contact.id}>
                      {contact.name}
                    </option>
                  ))
                ) : (
                  <option disabled value="">
                    Nenhum contato disponível
                  </option>
                )}
              </select>
            </div>
            <div className="col-5 mb-5">
              <label htmlFor="estateId" className="form-label">
                Imóvel
              </label>
              <select
                className="form-select"
                id="estateId"
                value={estateId}
                onChange={(e) => setEstateId(e.target.value)}
                required
              >
                <option disabled value="">
                  Selecione o imóvel...
                </option>
                {realEstates.length > 0 ? (
                  realEstates.map((realEstate) => (
                    <option value={realEstate.id} key={realEstate.id}>
                      {realEstate.registration}
                    </option>
                  ))
                ) : (
                  <option disabled value="">
                    Nenhum imóvel disponível
                  </option>
                )}
              </select>
            </div>
          </div>
          <div className="row  text-end align-items-end">
            <div className="my-5">
              <button type="submit" className="btn btn-primary">
                Agendar
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateAppointment;
