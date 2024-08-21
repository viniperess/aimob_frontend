import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import { NotificationType } from "../../types/notification";
import IconNotification from "../../assets/images/icons8-lembrete-de-compromissos.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Task } from "../../types/task";

const NotificationDropdown: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<NotificationType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState<Task | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get<NotificationType[]>("/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (selectedNotification) {
      const fetchTaskDetails = async () => {
        try {
          const response = await api.get<Task>(
            `/tasks/${selectedNotification.taskId}`
          );
          setTaskDetails(response.data);
        } catch (error) {
          console.error("Failed to fetch task details", error);
        }
      };
      fetchTaskDetails();
    }
  }, [selectedNotification]);

  const handleNotificationClick = (notification: NotificationType) => {
    setSelectedNotification(notification);
    setModalOpen(true);
  };

  const handleApprove = async () => {
    if (selectedNotification && taskDetails?.appointmentId) {
      try {
        await api.patch(`/appointments/${taskDetails.appointmentId}`, {
          visitApproved: true,
        });
        setModalOpen(false);
        setNotifications(
          notifications.filter((n) => n.id !== selectedNotification.id)
        );
        await api.delete(`/notifications/${selectedNotification.id}`);
      } catch (error) {
        console.error("Failed to approve task", error);
      }
    }

  };

  const handleDelete = async () => {
    if (selectedNotification) {
      try {
        const delNoti = await api.delete(`/tasks/${selectedNotification.taskId}`);
        const delTask = await api.delete(`/appointments/${taskDetails?.appointmentId}`);
        const delContact = await api.delete(`/contacts/${taskDetails?.contactId}`);
        console.log("DELETE:", delNoti,delTask,delContact);
        
        setModalOpen(false);
        setNotifications(
          notifications.filter((n) => n.id !== selectedNotification.id)
        );
        await api.delete(`/notifications/${selectedNotification.id}`);
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };

  const handleOk = async () => {
    if (selectedNotification) {
      setModalOpen(false);
      setNotifications(
        notifications.filter((n) => n.id !== selectedNotification.id)
      );
      await api.delete(`/notifications/${selectedNotification.id}`);
    }
  }

  return (
    <div className="notification-dropdown">
      <div
        className="notification-icon"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src={IconNotification}
          id="imgNotification"
          alt="Meu Ícone SVG"
          width="22"
          height="43"
        />
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </div>
      {dropdownOpen && (
        <div className="dropdown-menu  bg-primary open">
          {notifications.length > 0 ? (
            <ul className="notification-list">
              {notifications.map((notification) => (
                <React.Fragment key={notification.id}>
                  <li
                    className="text-white"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    Nova Tarefa #{notification.taskId}
                  </li>
                  <hr className="dropdown-divider bg-white" />
                </React.Fragment>
              ))}
            </ul>
          ) : (
            <div className="no-notifications">Sem Notificações</div>
          )}
        </div>
      )}
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {taskDetails ? (
            <>
              <p>
                <strong>Status:</strong> {taskDetails.status}
              </p>
              <p>
                <strong>Descrição:</strong> {taskDetails.description}
              </p>
              {taskDetails.realEstate && (
                <>
                  <h5>Imóvel:</h5>
                  <p>ID do Imóvel: {taskDetails.realEstate.id}</p>
                  <p>
                    Endereço: {taskDetails.realEstate.street},{" "}
                    {taskDetails.realEstate.number},{" "}
                    {taskDetails.realEstate.city}
                  </p>
                </>
              )}
              {taskDetails.contact && (
                <>
                  <h5>Contato:</h5>
                  <p>ID do Contato: {taskDetails.contact.id}</p>
                  <p>Nome: {taskDetails.contact.name}</p>
                  <p>Email: {taskDetails.contact.email}</p>
                  <p>Telefone: {taskDetails.contact.phone}</p>
                </>
              )}
              {taskDetails.appointment && taskDetails.appointment.visitDate && (
                <>
                  <h5>Agendamento:</h5>
                  <p>ID do Agendamento: {taskDetails.appointment.id}</p>
                  <p>
                    Data e Hora:{" "}
                    {new Date(
                      taskDetails.appointment.visitDate
                    ).toLocaleString()}
                  </p>
                  <p>Observação: {taskDetails.appointment.observation}</p>
                </>
              )}
            </>
          ) : (
            <p> Carregando...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          {taskDetails?.appointmentId ? (
            <>
          <Button variant="warning" onClick={handleDelete}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleApprove}>
            Aprovar
          </Button></>
          ) : (
            <Button variant="primary" onClick={handleOk}>
              OK
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationDropdown;
