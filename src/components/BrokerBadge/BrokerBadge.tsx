import React, { useEffect, useState } from "react";
import api from "../../service/api";
import { Card, Row, Col } from "react-bootstrap";
import "./BrokerBadge.css";

interface BrokerInfo {
  name: string;
  creci: string;
  phone: string;
  image: string;
}

interface BrokerBadgeProps {
  userId: number;
}

const BrokerBadge: React.FC<BrokerBadgeProps> = ({ userId }) => {
  const [broker, setBroker] = useState<BrokerInfo | null>(null);

  useEffect(() => {
    const fetchBrokerInfo = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setBroker(response.data);
      } catch (error) {
        console.error("Erro ao carregar informações do corretor:", error);
      }
    };

    fetchBrokerInfo();
  }, [userId]);

  if (!broker) return null;

  return (
    <Card className="broker-badge d-flex m-0 justify-content-start">
      <Row className="align-items-center w-100 flex-column flex-sm-row">
        <Col xs="auto" className="mb-2 mb-sm-0">
          <div className="broker-badge-image">
            <img
              src={broker.image || "/default-profile.png"}
              alt="Foto do Corretor"
              className="rounded-circle"
            />
          </div>
        </Col>
        <Col text-center text-sm-start>
          <Card.Body className="textBroker p-0" style={{fontSize: '10px'}}>
            <Card.Title className="mb-1" style={{fontSize: '12px'}}>{broker.name}</Card.Title>
            <Card.Text className="mb-1">CRECI: {broker.creci}</Card.Text>
            <Card.Text>Telefone: {broker.phone}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default BrokerBadge;
