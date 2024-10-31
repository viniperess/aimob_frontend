import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Modal, Button, Nav, Form } from 'react-bootstrap'; // Importar componentes do Bootstrap para modal, nav e form

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
  const [selectedFilter, setSelectedFilter] = useState<string>('toDo');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Task['contact'] | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<Task['appointment'] | null>(null);
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());

  const getTasks = async () => {
    try {
      const response = await api.get('tasks');
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
    const filtered = tasks.filter(task => {
      const taskDate = task.appointment ? new Date(task.appointment.visitDate) : null;
      if (filter === 'toDo') return !['Concluído', 'Atrasada'].includes(task.status);
      if (filter === 'today' && taskDate) return taskDate.toDateString() === today.toDateString() && task.status !== 'Concluído';
      if (filter === 'tomorrow' && taskDate) {
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        return taskDate.toDateString() === tomorrow.toDateString() && task.status !== 'Concluído';
      }
      if (filter === 'upcoming' && taskDate) return taskDate > today && taskDate.getTime() - today.getTime() <= 7 * 24 * 60 * 60 * 1000 && task.status !== 'Concluído';
      if (filter === 'overdue' && taskDate) return taskDate < today && task.status !== 'Concluído';
      if (filter === 'completed') return task.status === 'Concluído';
      return false;
    });
    setFilteredTasks(filtered);
  };

  const handleStatusChange = (taskId: number, newStatus: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
    api.patch(`/tasks/${taskId}`, { status: newStatus });
  };


  const handleDescriptionChange = (taskId: number, newDescription: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, description: newDescription };
      }
      return task;
    });
    setTasks(updatedTasks);
    api.patch(`/tasks/${taskId}`, { description: newDescription });
  };
  
  const handleObservationChange = (taskId: number, newObservation: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId && task.appointment) {
        return { ...task, appointment: { ...task.appointment, observation: newObservation } };
      }
      return task;
    });
    setTasks(updatedTasks);

    const taskWithAppointment = updatedTasks.find(task => task.id === taskId && task.appointment);
    if (taskWithAppointment && taskWithAppointment.appointment) {
      api.patch(`/appointments/${taskWithAppointment.appointment.id}`, { observation: newObservation });
    }
};

  const toggleTaskSelection = (taskId: number) => {
    const updatedSelection = new Set(selectedTasks);
    if (updatedSelection.has(taskId)) {
      updatedSelection.delete(taskId);
    } else {
      updatedSelection.add(taskId);
    }
    setSelectedTasks(updatedSelection);
  };

  const handleContactClick = (contact: Task['contact']) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleAppointmentClick = (appointment: Task['appointment']) => {
    setSelectedAppointment(appointment);
    setShowAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setShowContactModal(false);
    setShowAppointmentModal(false);
  };

  const handleBulkComplete = async () => {
    const updatedTasks = tasks.map(task => {
      if (selectedTasks.has(task.id)) {
        return { ...task, status: 'Concluído' };
      }
      return task;
    });
    setTasks(updatedTasks);
    setSelectedTasks(new Set());


    const promises = Array.from(selectedTasks).map(taskId =>
      api.patch(`/tasks/${taskId}`, { status: 'Concluído' })
    );
    await Promise.all(promises);
  };

  const handleBulkDelete = () => {
    selectedTasks.forEach(taskId => {
      api.delete(`/tasks/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    });
    setSelectedTasks(new Set()); // Clear selection after action
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 px-0">
        <h2 className="text-center mb-4">Tarefas do Corretor</h2>

        {/* Abas de Filtro */}
        <Nav variant="tabs" activeKey={selectedFilter} onSelect={(selectedKey) => setSelectedFilter(selectedKey || 'toDo')}>
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
            <Button variant="primary" style={{fontSize: "10px", marginRight: "5px"}} onClick={handleBulkComplete}>Concluído</Button>
            <Button variant="warning" style={{fontSize: "10px", width: "4.5rem"}} onClick={handleBulkDelete}>Excluir</Button>
          </div>
        )}


        <div className="table-responsive px-0 mt-3">
          <table className="table table-hover table-bordered w-100" style={{minHeight: "40vh"}}>
            <thead className="text-center text-white">
              <tr>
                <th className='bg-primary text-white'>
                  <Form.Check type="checkbox" onChange={(e) => {
                    if (e.target.checked) {
                      const allTaskIds = filteredTasks.map(task => task.id);
                      setSelectedTasks(new Set(allTaskIds));
                    } else {
                      setSelectedTasks(new Set());
                    }
                  }} />
                </th>
                <th className='bg-primary text-white'>ID</th>
                <th className='bg-primary text-white'>Nome</th>
                <th className='bg-primary text-white'>Status</th>
                <th className='bg-primary text-white'>Descrição</th>
                <th className='bg-primary text-white'>Data</th>
                <th className='bg-primary text-white'>Observação</th>
                <th className='bg-primary text-white'>Endereço</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedTasks.has(task.id)}
                      onChange={() => toggleTaskSelection(task.id)}
                    />
                  </td>
                  <td>{task.id}</td>
                  <td>
                    {task.contact ? (
                      <span onClick={() => handleContactClick(task.contact)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {task.contact.name}
                      </span>
                    ) : 'Sem contato'}
                  </td>
                  <td>
                    <Form.Select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
                      <option value="Pendente">Pendente</option>
                      <option value="Em Progresso">Em Progresso</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </Form.Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      value={task.description}
                      onChange={(e) => handleDescriptionChange(task.id, e.target.value)}
                      onFocus={() => setEditingTaskId(task.id)}
                      onBlur={() => setEditingTaskId(null)}
                    />
                  </td>
                  <td>
                    {task.appointment ? (
                      <span onClick={() => handleAppointmentClick(task.appointment)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                        {new Date(task.appointment.visitDate).toLocaleDateString()}
                      </span>
                    ) : 'Sem data'}
                  </td>
                  <td>
                    {task.appointment && editingTaskId === task.id ? (
                      <Form.Control
                        type="text"
                        value={task.appointment.observation}
                        onChange={(e) => handleObservationChange(task.id, e.target.value)}
                        onBlur={() => setEditingTaskId(null)}
                      />
                    ) : (
                      <span onClick={() => setEditingTaskId(task.id)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                        {task.appointment ? task.appointment.observation : 'Clique para adicionar'}
                      </span>
                    )}
                  </td>
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
