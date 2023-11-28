import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";

const SignUp: React.FC = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !name || !email || !roles || !password || !passwordTwo) {
      setError("Preencha todos os campos!");
      return;
    } else if (!emailRegex.test(email)) {
      setError("Informe um email válido");
      return;
    } else if (password !== passwordTwo) {
      setError("Senhas não conferem");
      return;
    } else if (password.length < 8 && password.length !== 0) {
      setError("Senha no minímo 8 caracter");
      return;
    }

    if (roles === "") {
      setError("Por favor, selecione um papel.");
      return;
    }
    
    try {
      await api.post(`users`, {
        user,
        name,
        email,
        roles,
        password: password,
      });
      navigate("/signin");
    } catch (error) {
      setEmailError("E-mail já existe.");
    }
    
  };

  return (
    <div className="container">
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
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Nome"
            onChange={(e) => [setName(e.target.value), setError("")]}
            className={
              error && !name ? "form-control is-invalid" : "form-control"
            }
          />
          <input
            type="text"
            name="user"
            id="user"
            value={user}
            placeholder="Usuário"
            onChange={(e) => [setUser(e.target.value), setError("")]}
            className={
              error && !user ? "form-control is-invalid" : "form-control"
            }
          />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="Email"
            onChange={(e) => [setEmail(e.target.value), setError("")]}
            className={
              (error && !email) ||
              (!emailRegex.test(email) && email.length !== 0)
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <select
            name="roles"
            id="roles"
            value={roles}
            onChange={(e) => [setRoles(e.target.value), setError("")]}
            className={
              error && !roles ? "form-control is-invalid" : "form-control"
            }
          >
            <option value="">Selecione um papel</option>
            <option value="CLIENT">Cliente</option>
            <option value="EMPLOYEE">Funcionário</option>
            <option value="OWNER">Proprietário</option>
          </select>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError("")]}
            className={
              (error && !password) ||
              (password.length < 8 && password.length !== 0)
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <input
            type="password"
            name="passwordTwo"
            id="passwordTwo"
            value={passwordTwo}
            placeholder="Password Confirm"
            onChange={(e) => [setPasswordTwo(e.target.value), setError("")]}
            className={
              (error && !passwordTwo) || password !== passwordTwo
                ? "form-control is-invalid"
                : "form-control"
            }
          />
          <label className="classErrors">{error}</label>
          <button type="submit" className="btnRegister">
            Registrar-se
          </button>
          <p className="log">
            Já possui uma conta? <a href="/SignIn">Faça Login</a>
          </p>
        </form>
      </div>
      <div className="image"></div>
    </div>
  );
};

export default SignUp;
