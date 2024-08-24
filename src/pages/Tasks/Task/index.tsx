import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Modal, Button } from 'react-bootstrap'; // Importar componentes do Bootstrap para modal

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
  const [selectedContact, setSelectedContact] = useState<Task['contact'] | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Task['appointment'] | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  const getTasks = async () => {
    try {
      const response = await api.get('tasks');
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao carregar as tarefas", error);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const handleContactClick = (contact: Task['contact']) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  }

  const handleAppointmentClick = (appointment: Task['appointment']) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  }

  const handleCloseModal = () => {
    setShowContactModal(false);
    setShowAppointmentModal(false);
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 px-0">
        <h2 className="text-center mb-4">Tarefas do Corretor</h2>
        <div className="table-responsive px-0">
          <table className="table table-hover table-bordered w-100">
            <thead className="text-center text-white">
              <tr>
                <th colSpan={2} className='bg-primary text-white'>TAREFA</th>
                <th colSpan={2} className='bg-primary text-white'>CONTATO</th>
                <th colSpan={2} className='bg-primary text-white'>AGENDAMENTO</th>
                <th colSpan={2} className='bg-primary text-white' >IMÓVEL</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-secondary text-white">
                <td className='bg-warning text-white fw-bold'>ID</td>
                <td className='bg-warning text-white fw-bold'>Status</td>
                <td className='bg-warning text-white fw-bold'>Nome</td>
                <td className='bg-warning text-white fw-bold'>Telefone</td>
                <td className='bg-warning text-white fw-bold'>Data</td>
                <td className='bg-warning text-white fw-bold'>Descrição</td>
                <td className='bg-warning text-white fw-bold'>Endereço</td>
              </tr>
              {tasks.map(task => (
                <tr key={task.id}>
                  {/* Colunas de Tarefa */}
                  <td>{task.id}</td>
                  <td>{task.status}</td>

                  {/* Colunas de Contato */}
                  <td>
                    {task.contact ? (
                      <span onClick={() => handleContactClick(task.contact)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {task.contact.name}
                      </span>
                    ) : 'Sem contato'}
                  </td>
                  <td>{task.contact ? task.contact.phone : 'Sem telefone'}</td>

                  {/* Colunas de Agendamento */}
                  <td>
                    {task.appointment ? (
                      <span onClick={() => handleAppointmentClick(task.appointment)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {new Date(task.appointment.visitDate).toLocaleDateString()}
                      </span>
                    ) : 'Sem data'}
                  </td>
                  <td>{task.appointment ? task.appointment.observation : 'Sem descrição'}</td>

                  {/* Coluna de Imóvel */}
                  <td>
                    {task.realEstate ? (
                      <a href={`/realEstate/${task.realEstate.id}`} className="text-primary" style={{ textDecoration: 'underline' }}>
                        {task.realEstate.street}, {task.realEstate.city}, {task.realEstate.state}
                      </a>
                    ) : 'Sem imóvel'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Detalhes do Contato */}
      <Modal show={showContactModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className='bg-primary text-white'>
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
        <Modal.Header closeButton className='bg-warning text-white'>
          <Modal.Title>Detalhes do Agendamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <>
              <p>Data e Hora: {new Date(selectedAppointment.visitDate).toLocaleString()}</p>
              <p>Observação: {selectedAppointment.observation}</p>
              <p>Visita Aprovada: {selectedAppointment.visitApproved ? 'Sim' : 'Não'}</p>
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
