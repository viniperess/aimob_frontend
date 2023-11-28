import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";

const SignIn: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post(`login`, { user, password });
      const { access_token, user_name } = response.data;

      localStorage.setItem("userToken", access_token);
      localStorage.setItem("userName", user_name);
      navigate("/");
    } catch (error) {
      if (!user || !password) {
        setError("Preencha todos os campos!");
        return;
      }
      setError("Seu usuário ou senha estão incorretos!");
      console.log(error);
    }
  };

  return (
    <div className="containerLogin">
      <div className="boxFormLogin">
        <h1 className="ola">Olá,</h1>
        <p className="textCabecalho">Para continuar navegando de forma segura, efetue o login</p>

        <form id="formLogin" method="post"              className="formLogin" onSubmit={handleLogin}>
          <h3>Login</h3>
          <input
            type="text"
            name="user"
            id="userLogin"
            value={user}
            placeholder="Usuário"
            onChange={(e) => [setUser(e.target.value), setError("")]}
            className={
              error && !user ? "form-control is-invalid" : "form-control"
            }
          />
          <input
            type="password"
            name="password"
            placeholder="Senha"
            id="passwordLogin"
            value={password}
            onChange={(e) => [setPassword(e.target.value), setError("")]}
            className={
              error && !password ? "form-control is-invalid" : "form-control"
            }
          />
          <label className="error">
            {error}
          </label>
          <button type="submit" className="btnLogin">
            Logar-se
          </button>
          <p className="logLogin">
            Novo por aqui? <a href="/SignUp">Registre-se</a>
          </p>
        </form>
      </div>
      <div className="imageLogin">
        {/* <img src={Logo} alt="Aimob logo" /> */}
      </div>
    </div>
  );
};

export default SignIn;
