import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../service/api";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Appointment } from "../../types/appointment";
import { ToastContainer } from "react-toastify";

const EditAppointment: React.FC = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [observation, setObservation] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitApproved, setVisitApproved] = useState(false);
  const [appointment, setAppointment] = useState<Appointment>();
  const navigate = useNavigate();
  console.log(visitDate);
  
  const getAppointment = useCallback(async () => {
    try {
      const response = await api.get(`appointments/${id}`);
      setAppointment(response.data);
      setObservation(response.data.observation);
      setVisitDate(response.data.visitDate);
      setVisitApproved(response.data.visitApproved);
    } catch (error) {
      console.error("GetAppointment, Erro ao buscar dados.", error);
    }
  }, [id]);

  useEffect(() => {
    getAppointment();
  }, [getAppointment]);

  const handleUpdateAppointment = async (e: FormEvent) => {
    e.preventDefault();
    const visitDate = new Date(`${date}T${time}`);

    try {
      await api.put(`/appointments/${appointment?.id}`, {
        observation,
        visitDate,
        visitApproved,
      });
      console.log("Requisição bem sucedida!");
      navigate("/");
    } catch (error) {
      console.error(
        "HandleSubmit Appointment, Erro ao atulizar o agendamento.",
        error
      );
    }
  };

  const handleDeleteAppointment = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir seu projeto? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`appointments/${appointment?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Delete Appointment: Erro ao excluir", error);
      }
    }
  }
  return (
    <>
      {" "}
      <Navbar />
      
      <div className="container bg-light-subtle">
        <form
          className="row row-cols-lg-auto g-3 align-items-center"
          method="post"
          key={appointment?.id}
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

          <div className="d-grid gap-2 d-md-flex">
            <button
              type="submit"
              onClick={handleUpdateAppointment}
              className="btn btn-info text-light"
            >
              Atualizar Contrato
            </button>
            <button
              type="submit"
              onClick={handleDeleteAppointment}
              className="btn btn-warning text-light"
            >
              Excluir Contrato
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />
      <Footer />
    </>
  );};

export default EditAppointment;
