import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../service/api';
import { Task } from '../../../types/task';
import { Spinner, Container, Row, Col, Card, Button } from 'react-bootstrap';
import './styles.css';

const TaskDetail: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get<Task>(`/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching the task', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!task) {
    return (
      <Container className="text-center" style={{ minHeight: '100vh' }}>
        <h3>Tarefa não encontrada</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4>Tarefa #{task.id}</h4>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h5>Status:</h5>
                  <p>{task.status}</p>
                </Col>
                <Col md={6}>
                  <h5>Descrição:</h5>
                  <p>{task.description}</p>
                </Col>
              </Row>
              {task.estateId && (
                <Row className="mb-4">
                  <Col>
                    <h5>Imóvel:</h5>
                    <p>ID do Imóvel: {task.estateId}</p>
                  </Col>
                </Row>
              )}
              {task.contactId && (
                <Row className="mb-4">
                  <Col>
                    <h5>Contato:</h5>
                    <p>ID do Contato: {task.contactId}</p>
                  </Col>
                </Row>
              )}
              {task.appointmentId && (
                <Row className="mb-4">
                  <Col>
                    <h5>Agendamento:</h5>
                    <p>ID do Agendamento: {task.appointmentId}</p>
                  </Col>
                </Row>
              )}
              <Button variant="primary" onClick={() => window.history.back()}>
                Voltar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskDetail;
