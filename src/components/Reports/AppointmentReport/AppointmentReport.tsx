import React, { useEffect, useState } from "react";
import api from "../../../service/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Button, Nav, Form } from "react-bootstrap";

interface Appointment {
  id: number;
  visitDate: string;
  observation: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  tasks: [
    {
      id: number;
      status: string;
      description: string;
    }
  ];
}

const AppointmentReport: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [month, setMonth] = useState<number | "">(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchAppointments = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
      setErrorMessage("Erro ao buscar agendamentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [statusFilter, month]);

  useEffect(() => {
    console.log("Dados retornados do back-end:", appointments);
  }, [appointments]);
  
  const filterAppointments = () => {
    let filtered = [...appointments]; // Clonar o array para evitar modificações
  
    // Filtro por status
    if (statusFilter !== "all") {
      filtered = filtered.filter((appointment) =>
        appointment.tasks.some((task) => task.status === statusFilter)
      );
    }
  
    // Filtro por mês
    if (month !== "") {
      filtered = filtered.filter((appointment) => {
        const appointmentDate = new Date(appointment.visitDate);
        return appointmentDate.getMonth() + 1 === Number(month);
      });
    }
  
    setFilteredAppointments(filtered);
  };
  
  const handleGenerateReport = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      const queryParams = new URLSearchParams();
  
      // Define o filtro de status
      if (statusFilter === "Concluído") {
        queryParams.append("filter", "completed");
      } else if (statusFilter === "Em Progresso") {
        queryParams.append("filter", "progress");
      } else if (statusFilter === "Pendente") {
        queryParams.append("filter", "pending");
      } else {
        queryParams.append("filter", "all");
      }
  
      // Define o filtro de mês
      if (month !== "") {
        queryParams.append("month", String(month));
      }
  
      const response = await api.get(`/appointments/report?${queryParams}`, {
        responseType: "blob", // Garante que a resposta seja um Blob
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-agendamentos.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      setErrorMessage("Erro ao gerar o relatório de agendamentos.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 px-0">
        <h2 className="text-center mb-4">Relatório de Agendamentos</h2>

        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
            <button
              type="button"
              className="close"
              onClick={() => setErrorMessage("")}
            >
              &times;
            </button>
          </div>
        )}

        <Form.Group controlId="statusSelect" className="m-3 col-3">
          <Form.Label>Filtrar por Status</Form.Label>
          <Form.Control
            as="select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluído">Concluído</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="monthSelect" className="m-3 col-3">
          <Form.Label>Filtrar por Mês</Form.Label>
          <Form.Control
            as="select"
            value={month}
            onChange={(e) => setMonth(Number(e.target.value) || "")}
          >
            <option value="">Todos os Meses</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button
          className="d-flex justify-content-center mb-5 mt-1 m-3 col-2"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? "Gerando Relatório..." : "Baixar Relatório"}
        </Button>

        <div className="table-responsive px-0 mt-3">
          <table className="table table-hover table-bordered w-100">
            <thead className="text-center text-white">
              <tr>
                <th className="bg-primary text-white">ID</th>
                <th className="bg-primary text-white">Cliente</th>

                <th className="bg-primary text-white">Data do Agendamento</th>
                <th className="bg-primary text-white">Status das Tarefas</th>
                <th className="bg-primary text-white">Observação</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.contact?.name || "Nome não disponível"}</td>
                  <td>
                    {new Date(appointment.visitDate).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>
                    {appointment.tasks && appointment.tasks.length > 0
                      ? appointment.tasks.map((task, index) => (
                          <span key={index}>
                            {task.status}
                          </span>
                        ))
                      : "Sem status"}
                  </td>
                  <td>{appointment.observation || "Sem observação"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AppointmentReport;
