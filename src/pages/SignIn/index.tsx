import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import Logo from "../../assets/images/aimoblogo_azul.png";
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
    <div
      className="container-fluid d-flex"
      style={{height: "100vh"
      }}
    >
      <div className="col text-start m-4">
      <div
        className="boxFormLogin align-items-start m-4"
      >
        <h1 className="ola mx-4">
          Olá,
        </h1>
        <p className="text-start mx-4">
          Para continuar navegando de forma segura, efetue o login
        </p>

        <form
          id="formLogin"
          method="post"
          className="formLogin m-4"
          onSubmit={handleLogin}
        >
          <h3>Login</h3>
          <div className="row">
            <div className="col">
              <label htmlFor="userLogin" className="form-label">
                Usuário
              </label>
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
            </div>
            <div className="col">
              <label htmlFor="passwordLogin" className="form-label">
                Senha
              </label>
              <input
                type="password"
                name="password"
                placeholder="Senha"
                id="passwordLogin"
                value={password}
                onChange={(e) => [setPassword(e.target.value), setError("")]}
                className={
                  error && !password
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </div>
          </div>
          <div className="text-center">
            <label className="text-danger">{error}</label>
          </div>
          <button type="submit" className="btnLogin btn-primary w-100">
            Logar-se
          </button>
          <p className="text-center logLogin">
            Novo por aqui? <a href="/SignUp">Registre-se</a> ou <a href="http:/forgot_password">Esqueceu a senha</a>
          </p>
          
        </form>
      </div>
      </div>
      <div className="page-container imageLogin col-6">
        <img src={Logo} alt="Aimob logo" />
      </div>
    </div>
  );
};

export default SignIn;
