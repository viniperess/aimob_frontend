import React, { useEffect, useState } from 'react';
import api from '../../../service/api';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Modal, Button, Nav, Form } from 'react-bootstrap';

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

const ContactReport: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [totalContacts, setTotalContacts] = useState(0);
  const [selectedContacts, setSelectedContacts] = useState<Set<number>>(new Set());
  const [editingField, setEditingField] = useState<{ id: number | null; field: string | null }>({ id: null, field: null });
  const [tempValue, setTempValue] = useState<string>('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const response = await api.get('contacts');
      setContacts(response.data);
      setTotalContacts(response.data.length);
      setFilteredContacts(response.data);
    } catch (error) {
      console.error('Erro ao buscar contatos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts(filter);
  }, [filter, contacts]);

  const filterContacts = (filter: string) => {
    const today = new Date();
    let filtered;

    if (filter === '15days') {
      const fifteenDaysAgo = new Date(today.setDate(today.getDate() - 15));
      filtered = contacts.filter(contact => new Date(contact.createdAt) >= fifteenDaysAgo);
    } else if (filter === 'today') {
        const startOfToday = new Date(today.setHours(0, 0, 0, 0));
        const endOfToday = new Date(today.setHours(23, 59, 59, 999));
        filtered = contacts.filter(contact => {
            const createdAt = new Date(contact.createdAt);
            return createdAt >= startOfToday && createdAt <= endOfToday;
          });
    } else {
      filtered = contacts;
    }
    setFilteredContacts(filtered);
  };

  const toggleContactSelection = (contactId: number) => {
    const updatedSelection = new Set(selectedContacts);
    if (updatedSelection.has(contactId)) {
      updatedSelection.delete(contactId);
    } else {
      updatedSelection.add(contactId);
    }
    setSelectedContacts(updatedSelection);
  };
  
  const handleBulkDelete = () => {
    selectedContacts.forEach(contactId => {
      api.delete(`/contacts/${contactId}`);
      setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    });
    setSelectedContacts(new Set()); // Clear selection after action
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `/contacts/report?filter=${filter}`,
        {
          responseType: 'blob',
        }
      );
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'relatorio-contatos.pdf');
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao gerar o relatório:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (contactId: number, field: string, value: string) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === contactId) {
        return { ...contact, [field]: value };
      }
      return contact;
    });
    setContacts(updatedContacts);
    api.patch(`/contacts/${contactId}`, { [field]: value });
    setEditingField({ id: null, field: null });
  };

  const handleFieldSave = (contactId: number, field: string) => {
    handleFieldChange(contactId, field, tempValue); // Salva o valor temporário
  };

  const renderEditableField = (contactId: number, field: string, value: string) => {
    if (editingField.id === contactId && editingField.field === field) {
      return (
        <Form.Control
          type={field === 'email' ? 'email' : 'text'}
          value={tempValue} 
          onChange={(e) => setTempValue(e.target.value)} 
          onBlur={() => handleFieldSave(contactId, field)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleFieldSave(contactId, field);
            }
          }}
        />
      );
    }
    return (
      <span onClick={() => {
        setEditingField({ id: contactId, field });
        setTempValue(value);
      }} 
      style={{ cursor: 'pointer', textDecoration: 'underline' }}>
        {value}
      </span>
    );
  };

  return (
    <>
    <Navbar />
    <div className="container-fluid mt-4 px-0">
      <h2 className="text-center mb-4">Contatos</h2>

      <p className="m-3">Total de contatos cadastrados: <strong>{totalContacts}</strong></p>

      <Form.Group controlId="filterSelect" className="m-3 mb-1 col-2">
        <Form.Label>Filtrar por período</Form.Label>
        <Form.Control
          as="select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Todos os contatos</option>
          <option value="today">Hoje</option>
          <option value="15days">Últimos 15 dias</option>
        </Form.Control>
      </Form.Group>

      <Button  className="d-flex justify-content-center mb-5 mt-1 m-3 col-2" onClick={handleGenerateReport} disabled={loading}>
        {loading ? 'Gerando Relatório...' : 'Baixar Relatório'}
      </Button>

      {/* Abas de Filtro */}
      <Nav variant="tabs" activeKey={filter} onSelect={(selectedKey) => setFilter(selectedKey || 'all')}>
        <Nav.Item>
          <Nav.Link eventKey="all">Todos</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="today">Hoje</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="15days">Últimos 15 Dias</Nav.Link>
        </Nav.Item>
      </Nav>

      {/* Ações em massa */}
      {selectedContacts.size > 0 && (
        <div className="d-flex justify-content-start m-3">
          <Button variant="warning" onClick={handleBulkDelete}>Excluir</Button>
        </div>
      )}

      {/* Tabela de Contatos */}
      <div className="table-responsive px-0 mt-3">
        <table className="table table-hover table-bordered w-100">
          <thead className="text-center text-white">
            <tr>
              <th className='bg-primary text-white'>
                <Form.Check type="checkbox" onChange={(e) => {
                  if (e.target.checked) {
                    const allContactIds = filteredContacts.map(contact => contact.id);
                    setSelectedContacts(new Set(allContactIds));
                  } else {
                    setSelectedContacts(new Set());
                  }
                }} />
              </th>
              <th className='bg-primary text-white'>ID</th>
              <th className='bg-primary text-white'>Nome</th>
              <th className='bg-primary text-white'>Email</th>
              <th className='bg-primary text-white'>Telefone</th>
              <th className='bg-primary text-white'>Data de Criação</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedContacts.has(contact.id)}
                    onChange={() => toggleContactSelection(contact.id)}
                  />
                </td>
                <td>{contact.id}</td>
                <td>{renderEditableField(contact.id, 'name', contact.name)}</td>
                <td>{renderEditableField(contact.id, 'email', contact.email)}</td>
                <td>{renderEditableField(contact.id, 'phone', contact.phone)}</td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
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

export default ContactReport;
