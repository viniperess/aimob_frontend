import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";

const SignUp: React.FC = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    if (!user || !name || !email || !cpf || !birthdate || !password || !passwordTwo) {
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
        birthdate,
        password: password,
      });
      navigate("/signin");
    } catch (error) {
      setEmailError("E-mail já existe.");
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
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Nome"
            onChange={(e) => [setName(e.target.value), setError("")]}
            className={error && !name ? "errors" : "input_control"}
          />
          <input
            type="text"
            name="user"
            id="user"
            value={user}
            placeholder="Usuário"
            onChange={(e) => [setUser(e.target.value), setError("")]}
            className={error && !user ? "errors" : "input_control"}
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
                ? "errors"
                : "input_control"
            }
          />
          <input
            type="text"
            name="cpf"
            id="cpf"
            value={cpf}
            placeholder="Cpf"
            onChange={(e) => [setCpf(e.target.value), setError("")]}
            className={error && !cpf ? "errors" : "input_control"}
          />
          <input
            type="date"
            name="birthdate"
            id="birthdate"
            value={birthdate}
            placeholder="Data de Nascimento"
            onChange={(e) => [setBirthdate(e.target.value), setError("")]}
            className={error && !birthdate ? "errors" : "input_control"}
          />

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
                ? "errors"
                : "input_control"
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
                ? "errors"
                : "input_control"
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
