import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import Logo from "../../assets/images/aimoblogo_azul.png";
import axios from "axios";
const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !emailRegex.test(email)) {
      setError("Por favor, insira um email válido.");
      return;
    }
    setLoading(true);
    setError("");

    console.log("Tentando enviar o email:", email);
    try {
      await api.post("forgot-password", { email });
      navigate("/reset_password", { state: { email } });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError(
            "Erro ao enviar o email de redefinição de senha. Tente novamente."
          );
        }
      } else {
        setError("Ocorreu um erro inesperado. Tente novamente.");
      }
    }
  };

  return (
    <div className="container-fluid d-flex p-0" style={{ height: "100vh" }}>
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
            {error && (
                  <div className="alert alert-danger text-center" role="alert">
                    {error}
                  </div>
                )}
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
               
              </div>
            </div>
            <div className="row">
            <button
              type="submit"
              className="btnForgot btn-primary"
              disabled={loading}
              
            >
              {loading ? "Enviando..." : "Enviar Código"}
            </button>
            </div>
          </form>
          <p className="text-center logForgot">
            Lembrou sua senha? <a href="/signin">Voltar ao Login</a>
          </p>
        </div>
      </div>
      <div className="container imageForgot col-6 m-0">
        <img src={Logo} alt="Aimob logo" />
      </div>
    </div>
  );
};

export default ForgotPassword;
