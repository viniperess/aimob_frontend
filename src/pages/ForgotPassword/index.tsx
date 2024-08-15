import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import Logo from "../../assets/images/aimoblogo_azul.png";
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }

    try {
      await api.post("forgot-password", { email });
      navigate("/reset_password", { state: { email } });
    } catch (error) {
      setError("O email não foi encontrado. Verifique e tente novamente.");
    }
  };

  return (
    <div className="container-fluid d-flex" style={{ height: "100vh"}}>
      <div className="col align-items-center justify-content-start d-flex text-start m-4">
        <div className="boxFormForgot">
          <h1 className="olaForgot justify-content-start align-items-start">
            Esqueceu a Senha?
          </h1>
          <p className="text-start justify-content-start align-items-start">
            Insira seu email para receber um código de recuperação de senha.
          </p>
          <form
            id="formForgotPassword"
            method="post"
            className="formForgot"
            onSubmit={handleEmail}
          >
            <div className="row">
              <div className="col">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="emailForgot"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => [setEmail(e.target.value), setError("")]}
                  className={
                    error && !email ? "form-control is-invalid" : "form-control"
                  }
                />
                <div className="invalid-feedback">{error}</div>
              </div>
            </div>
            <button type="submit" className="btnForgot btn-primary">
              Enviar Código
            </button>
          </form>
          <p className="text-center logForgot">
            Lembrou sua senha? <a href="/signin">Voltar ao Login</a>
          </p>
        </div>
      </div>
      <div className="container imageForgot col-6">
        <img src={Logo} alt="Aimob logo" />
      </div>
    </div>
  );
};

export default ForgotPassword;
