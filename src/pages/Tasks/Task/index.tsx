import React, { useEffect, useState } from "react";
import api from "../../../service/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Modal, Button, Nav, Form } from "react-bootstrap";

interface Task {
  id: number;
  description: string;
  status: string;
  contact: {
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null;
  appointment: {
    id: number;
    visitDate: string;
    observation: string;
    visitApproved: boolean;
  } | null;
  realEstate: {
    id: number;
    street: string;
    city: string;
    state: string;
  } | null;
}

const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("toDo");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<
    Task["contact"] | null
  >(null);
  const [selectedAppointment, setSelectedAppointment] = useState<
    Task["appointment"] | null
  >(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  const getTasks = async () => {
    try {
      const response = await api.get("tasks");
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Erro ao carregar as tarefas", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  useEffect(() => {
    filterTasks(selectedFilter);
  }, [selectedFilter, tasks]);

  const filterTasks = (filter: string) => {
    const today = new Date();
    const filtered = tasks.filter((task) => {
      const taskDate = task.appointment
        ? new Date(task.appointment.visitDate)
        : null;
      if (filter === "toDo")
        return !["Concluído", "Atrasada"].includes(task.status);
      if (filter === "today" && taskDate)
        return (
          taskDate.toDateString() === today.toDateString() &&
          task.status !== "Concluído"
        );
      if (filter === "tomorrow" && taskDate) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return (
          taskDate.toDateString() === tomorrow.toDateString() &&
          task.status !== "Concluído"
        );
      }
      if (filter === "upcoming" && taskDate)
        return (
          taskDate > today &&
          taskDate.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000 &&
          task.status !== "Concluído"
        );
      if (filter === "overdue" && taskDate)
        return taskDate < today && task.status !== "Concluído";
      if (filter === "completed") return task.status === "Concluído";
      return false;
    });
    setFilteredTasks(filtered);
  };

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    try {
      await api.patch(`/tasks/${taskId}`, { status: newStatus });
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
    }
  };

  const handleDescriptionChange = async (
    taskId: number,
    newDescription: string
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
    try {
      await api.patch(`/tasks/${taskId}`, { description: newDescription });
    } catch (error) {
      console.error("Erro ao atualizar a descrição:", error);
    }
  };

  const handleObservationChange = async (
    taskId: number,
    newObservation: string
  ) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId && task.appointment) {
        return {
          ...task,
          appointment: { ...task.appointment, observation: newObservation },
        };
      }
      return task;
    });
    setTasks(updatedTasks);

    const taskWithAppointment = updatedTasks.find(
      (task) => task.id === taskId && task.appointment
    );
    if (taskWithAppointment && taskWithAppointment.appointment) {
      try {
        await api.patch(`/appointments/${taskWithAppointment.appointment.id}`, {
          observation: newObservation,
        });
      } catch (error) {
        console.error("Erro ao atualizar a observação:", error);
      }
    }
  };

  const handleContactClick = (contact: Task["contact"]) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleAppointmentClick = (appointment: Task["appointment"]) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setShowAppointmentModal(false);
  };

  const handleBulkDelete = async () => {
    const tasksToDelete = Array.from(selectedTasks);
  
    setTasks((prevTasks) =>
      prevTasks.filter((task) => !tasksToDelete.includes(task.id))
    );
  
    try {
      await Promise.all(
        tasksToDelete.map((taskId) =>
          api.delete(`/tasks/${taskId}`)
        )
      );
      setSelectedTasks(new Set());
    } catch (error) {
      console.error("Erro ao excluir tarefas:", error);
    }
  };

  const handleMarkAsCompleted = async () => {
    const tasksToUpdate = Array.from(selectedTasks);
  
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        tasksToUpdate.includes(task.id)
          ? { ...task, status: "Concluído" }
          : task
      )
    );
  
    try {
      await Promise.all(
        tasksToUpdate.map((taskId) =>
          api.patch(`/tasks/${taskId}`, { status: "Concluído" })
        )
      );
      setSelectedTasks(new Set()); // Limpa a seleção após a ação
    } catch (error) {
      console.error("Erro ao marcar tarefas como concluídas:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 px-0">
        <h2 className="text-center mb-4">Tarefas do Corretor</h2>

        {/* Abas de Filtro */}
        <Nav
          variant="tabs"
          activeKey={selectedFilter}
          onSelect={(selectedKey) => setSelectedFilter(selectedKey || "toDo")}
        >
          <Nav.Item>
            <Nav.Link eventKey="toDo">Para Fazer</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="today">Vence Hoje</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="tomorrow">Amanhã</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="upcoming">Próximas</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="overdue">Atrasada</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="completed">Concluídas</Nav.Link>
          </Nav.Item>
        </Nav>
        {selectedTasks.size > 0 && (
          <div className="d-flex justify-content-start m-3">
            <Button
              variant="primary"
              onClick={() => handleMarkAsCompleted()}
              className="me-2"
              style={{ fontSize: "12px",width: "7%" }}
            >
              Concluído
            </Button>
            <Button
              variant="warning"
              onClick={() => handleBulkDelete()}
              className="me-2"
              style={{ fontSize: "12px", width: "7%" }}
            
            >
              Excluir
            </Button>
          </div>
        )}
        <div className="table-responsive px-0 mt-3">
          <table
            className="table table-hover table-bordered w-100"
            style={{ minHeight: "40vh" }}
          >
            <thead className="text-center text-white">
              <tr>
                <th className="bg-primary text-white">
                  <Form.Check
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        const allTaskIds = filteredTasks.map((task) => task.id);
                        setSelectedTasks(new Set(allTaskIds));
                      } else {
                        setSelectedTasks(new Set());
                      }
                    }}
                  />
                </th>
                <th className="bg-primary text-white">ID</th>
                <th className="bg-primary text-white">Nome</th>
                <th className="bg-primary text-white">Status</th>
                <th className="bg-primary text-white">Descrição</th>
                <th className="bg-primary text-white">Data</th>
                <th className="bg-primary text-white">Observação</th>
                <th className="bg-primary text-white">Endereço</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedTasks.has(task.id)}
                      onChange={() => {
                        const updatedSelection = new Set(selectedTasks);
                        if (updatedSelection.has(task.id)) {
                          updatedSelection.delete(task.id);
                        } else {
                          updatedSelection.add(task.id);
                        }
                        setSelectedTasks(updatedSelection);
                      }}
                    />
                  </td>
                  <td>{task.id}</td>
                  <td>
                    {task.contact ? (
                      <span
                        onClick={() => handleContactClick(task.contact)}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        {task.contact.name}
                      </span>
                    ) : (
                      "Sem contato"
                    )}
                  </td>
                  <td>
                    <Form.Select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Progresso">Em Progresso</option>
                      <option value="Concluído">Concluído</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Select
                      value={task.description}
                      onChange={(e) =>
                        handleDescriptionChange(task.id, e.target.value)
                      }
                    >
                      <option value="Aguardando Mais Informações">
                        Aguardando Mais Informações
                      </option>
                      <option value="Visita Agendada">Visita Agendada</option>
                      <option value="Visita Realizada">Visita Realizada</option>
                      <option value="Visita Cancelada">Visita Cancelada</option>
                      <option value="Conversa Realizada">
                        Conversa Realizada
                      </option>
                    </Form.Select>
                  </td>
                  <td>
                    {task.appointment ? (
                      <span
                        onClick={() => handleAppointmentClick(task.appointment)}
                        style={{
                          cursor: "pointer",
                          color: "blue",
                          textDecoration: "underline",
                        }}
                      >
                        {new Date(
                          task.appointment.visitDate
                        ).toLocaleDateString()}
                      </span>
                    ) : (
                      "Sem data"
                    )}
                  </td>
                  <td>
                    {task.status === "Concluído" && task.appointment ? (
                      <Form.Control
                        type="text"
                        value={task.appointment.observation || ""}
                        onChange={(e) =>
                          handleObservationChange(task.id, e.target.value)
                        }
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>
                    {task.realEstate ? (
                      <a
                        href={`/realEstate/${task.realEstate.id}`}
                        className="text-primary"
                        style={{ textDecoration: "underline" }}
                      >
                        {task.realEstate.street}, {task.realEstate.city},{" "}
                        {task.realEstate.state}
                      </a>
                    ) : (
                      "Sem imóvel"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Detalhes do Contato */}
      <Modal show={showContactModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Detalhes do Contato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <>
              <p>ID: {selectedContact.id}</p>
              <p>Nome: {selectedContact.name}</p>
              <p>Email: {selectedContact.email}</p>
              <p>Telefone: {selectedContact.phone}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Detalhes do Agendamento */}
      <Modal show={showAppointmentModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className="bg-warning text-white">
          <Modal.Title>Detalhes do Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>
                Data e Hora:{" "}
                {new Date(selectedAppointment.visitDate).toLocaleString()}
              </p>
              <p>Observação: {selectedAppointment.observation}</p>
              <p>
                Visita Aprovada:{" "}
                {selectedAppointment.visitApproved ? "Sim" : "Não"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  );
};

export default TaskTable;
