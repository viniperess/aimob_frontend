import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import InputMask from "react-input-mask";

const SignUp: React.FC = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [creci, setCreci] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !user ||
      !name ||
      !email ||
      !cpf ||
      !password ||
      !passwordTwo ||
      !creci ||
      !city ||
      !phone
    ) {
      setError("Preencha todos os campos!");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Informe um email válido");
      return;
    } else if (password !== passwordTwo) {
      setError("Senhas não conferem");
      return;
    } else if (password.length < 8 && password.length !== 0) {
      setError("Senha no mínimo 8 caracteres");
      return;
    }

    try {
      await api.post(`users`, {
        user,
        name,
        email,
        cpf,
        city,
        phone,
        creci,
        password: password,
      });
      navigate("/signin");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Erro ao registrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="containerRegister">
      <div className="boxFormRegister">
        <div className="textoCabecalho">
          <h1>Olá,</h1>
          <p>Por favor, registre-se para continuar</p>
        </div>
        <form
          method="post"
          onSubmit={handleRegister}
          className="formRegister"
          id="form"
        >
          <h3>Registro</h3>
          <div className="row">
            <div className="col-12">
              <input
                type="email"
                name="email"
                style={{ borderRadius: "50px" }}
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => [setEmail(e.target.value), setError("")]}
                className={`form-control ${
                  (error && !email) ||
                  (!emailRegex.test(email) && email.length !== 0)
                    ? "is-invalid"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                name="name"
                style={{ borderRadius: "50px" }}
                id="name"
                value={name}
                placeholder="Nome"
                onChange={(e) => [setName(e.target.value), setError("")]}
                className={`form-control ${error && !name ? "is-invalid" : ""}`}
              />
            </div>

            <div className="col-6">
              <input
                type="text"
                style={{ borderRadius: "50px" }}
                name="user"
                id="user"
                value={user}
                placeholder="Usuário"
                onChange={(e) => [setUser(e.target.value), setError("")]}
                className={`form-control ${error && !user ? "is-invalid" : ""}`}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <InputMask
                mask="999.999.999-99"
                id="cpf"
                name="cpf"
                style={{ borderRadius: "50px" }}
                aria-describedby="cpfFeedback"
                value={cpf}
                placeholder="Cpf"
                onChange={(e) => [setCpf(e.target.value), setError("")]}
                className={`form-control ${error && !cpf ? "is-invalid" : ""}`}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="city"
                id="city"
                style={{ borderRadius: "50px" }}
                value={city}
                placeholder="Cidade"
                onChange={(e) => [setCity(e.target.value), setError("")]}
                className={`form-control ${error && !city ? "is-invalid" : ""}`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <InputMask
                id="phone"
                name="phone"
                type="text"
                mask="(99) 99999-9999"
                maskChar={null}
                placeholder="Telefone"
                style={{ borderRadius: "50px" }}
                value={phone}
                onChange={(e) => [setPhone(e.target.value), setError("")]}
                className={`form-control ${
                  error && !phone ? "is-invalid" : ""
                }`}
              />
            </div>
            <div className="col">
              <input
                type="text"
                name="creci"
                id="creci"
                style={{ borderRadius: "50px" }}
                value={creci}
                placeholder="Creci"
                onChange={(e) => [setCreci(e.target.value), setError("")]}
                className={`form-control ${
                  error && !creci ? "is-invalid" : ""
                }`}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Senha"
                style={{ borderRadius: "50px" }}
                value={password}
                onChange={(e) => [setPassword(e.target.value), setError("")]}
                className={`form-control ${
                  (error && !password) ||
                  (password.length < 8 && password.length !== 0)
                    ? "is-invalid"
                    : ""
                }`}
              />
            </div>
            <div className="col">
              <input
                type="password"
                name="passwordTwo"
                id="passwordTwo"
                value={passwordTwo}
                style={{ borderRadius: "50px" }}
                placeholder="Confirmar Senha"
                onChange={(e) => [setPasswordTwo(e.target.value), setError("")]}
                className={`form-control ${
                  (error && !passwordTwo) || password !== passwordTwo
                    ? "is-invalid"
                    : ""
                }`}
              />
            </div>
          </div>
          <div className="text-center">
            <label className="text-danger">{error}</label>
          </div>
          <div className="row d-grid">
            <button
              type="submit"
              className="btn bg-white text-primary"
              style={{ borderRadius: "50px", width: "100%" }}
            >
              Registrar-se
            </button>
          </div>
          <p className="text-center text-white">
            Já possui uma conta? <a href="/SignIn">Faça Login</a>
          </p>
        </form>
      </div>
      <div className="image"></div>
    </div>
  );
};

export default SignUp;
