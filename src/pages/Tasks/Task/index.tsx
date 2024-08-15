import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

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

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <h2 className="text-center mb-4">Tarefas do Corretor</h2>
        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '15%' }}>Nome do Contato</th>
                <th style={{ width: '15%' }}>Email</th>
                <th style={{ width: '10%' }}>Telefone</th>
                <th style={{ width: '10%' }}>Status</th>
                <th style={{ width: '20%' }}>Descrição</th>
                <th style={{ width: '10%' }}>Data do Agendamento</th>
                <th style={{ width: '10%' }}>Observação do Agendamento</th>
                <th style={{ width: '10%' }}>Visita Aprovada</th>
                <th style={{ width: '20%' }}>Imóvel</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.contact ? task.contact.name : 'Sem contato'}</td>
                  <td>{task.contact ? task.contact.email : 'Sem email'}</td>
                  <td>{task.contact ? task.contact.phone : 'Sem telefone'}</td>
                  <td>{task.status}</td>
                  <td>{task.description}</td>
                  <td>{task.appointment ? new Date(task.appointment.visitDate).toLocaleDateString() : 'Sem agendamento'}</td>
                  <td>{task.appointment ? task.appointment.observation : 'Sem observação'}</td>
                  <td>{task.appointment ? (task.appointment.visitApproved ? 'true' : 'false') : 'Não'}</td>
                  <td>
                    {task.realEstate ? `${task.realEstate.street}, ${task.realEstate.city}, ${task.realEstate.state}` : 'Sem imóvel'}
                  </td>
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

export default TaskTable;
