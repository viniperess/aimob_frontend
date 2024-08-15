import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import './styles.css';

const CreateContact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/contacts", { name, email, phone });
      navigate("/");
    } catch (error) {
       console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="form-container mt-5 mb-5">
        <h2 className="text-center">Inserção de Contato</h2>
        <form onSubmit={handleSubmit} >
          <div className="row">
            <div className="col">
              <label htmlFor="name" className="form-label">Nome</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="phone" className="form-label">Telefone</label>
              <input
                type="tel"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-info text-light fw-medium ">Enviar</button>
          </div>
        </form>
      </div>
      <Footer 
      />
    </>
  );
};

export default CreateContact;