import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../service/api";
import "./styles.css";
import Logo from "../../assets/images/aimoblogo_azul.png";

const ResetPassword: React.FC = () => {
  const location = useLocation();
  const { email } = location.state || {};
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirmation password
  const [error, setError] = useState("");
  const [codeError, setCodeError] = useState(""); // State for reset code error
  const navigate = useNavigate();

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();

    if (password.length < 8) {
      setError("A senha deve conter no mínimo 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      await api.post("reset-password", { email, resetCode, password });
      navigate("/signin");
    } catch (error) {
      setCodeError("O código de recuperação está incorreto. Tente novamente.");
    }
  };

  // Real-time validation for password confirmation
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setError("As senhas não coincidem.");
    } else {
      setError("");
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setError("As senhas não coincidem.");
    } else {
      setError("");
    }
  };

  return (
    <div className="container-fluid d-flex p-0" style={{ height: "100vh" }}>
      <div className="col align-items-center justify-content-start d-flex text-start m-4">
        <div className="boxFormReset">
          <h1 className="olaReset justify-content-start align-items-start">
            Resetar Senha
          </h1>
          <p className="text-start justify-content-start align-items-start">
            Insira o código de recuperação e sua nova senha.
          </p>
          <form
            id="formResetPassword"
            method="post"
            className="formReset"
            onSubmit={handleReset}
          >
            <div className="row">
              <div className="col">
                <label htmlFor="resetCode" className="form-label">
                  Código de Recuperação
                </label>
                <input
                  type="text"
                  name="resetCode"
                  id="resetCode"
                  value={resetCode}
                  placeholder="Código de Recuperação"
                  onChange={(e) => [setResetCode(e.target.value), setCodeError("")]}
                  className={`form-control ${codeError ? "is-invalid" : ""}`}
                />
                {codeError && (
                  <div className="invalid-feedback d-block text-center">
                    {codeError}
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="password" className="form-label">
                  Nova Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="passwordReset"
                  value={password}
                  placeholder="Nova Senha"
                  onChange={handlePasswordChange}
                  className={`form-control ${error && !confirmPassword ? "is-invalid" : ""}`}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPasswordReset"
                  value={confirmPassword}
                  placeholder="Confirmar Senha"
                  onChange={handleConfirmPasswordChange}
                  className={`form-control ${error && password !== confirmPassword ? "is-invalid" : ""}`}
                />
                {error && (
                  <div className="invalid-feedback d-block text-center">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-4">
            <button type="submit" className="btnReset btn-primary">
              Resetar Senha
            </button>
            </div>
          </form>
          <p className="text-center logReset">
            Lembrou sua senha? <a href="/signin">Voltar ao Login</a>
          </p>
        </div>
      </div>
      <div className="container imageReset col-6 m-0">
        <img src={Logo} alt="Aimob logo" />
      </div>
    </div>
  );
};

export default ResetPassword;
