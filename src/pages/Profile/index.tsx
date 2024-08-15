import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../service/api";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User>();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [creci, setCreci] = useState("");
  const [password, setPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function validatePhone(phone: string): boolean {
    if (phone.trim() === "") {
      return true;
    }
    const standard = /^(\(\d{2}\)\s?)?\d{5}-\d{4}$/;
    return standard.test(phone);
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/[^0-9]/g, "");
    setPhone(newPhone);
  };

  const handlePhoneBlur = () => {
    if (!validatePhone(phone)) {
      setError("Telefone inválido!");
    } else {
      setError("");
    }
  };

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      setUser(response.data.user);
      setName(response.data.name);
      setCpf(response.data.cpf);
      setCity(response.data.city);
      setPhone(response.data.phone);
      setCreci(response.data.creci);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data: any = {
        user,
        name,
        cpf,
        city,
        phone,
        creci,
      };

      if (password) {
        data.password = password;
      }

      await api.patch(`users/${profile?.id}`, data);

      getProfile();

      toast.success("Perfil atualizado com sucesso!\nRedirecionando...", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });

      setTimeout(() => {
        navigate("/signin");
      }, 4000);
    } catch (error) {
      console.error("Erro ao atualizar o perfil: ", error);
    }
  };

  const handleDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir sua conta? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`users/${profile?.id}`);
        localStorage.removeItem("userToken");
        localStorage.removeItem("userName");
        navigate("/signin");
      } catch (error) {
        console.error("Erro ao excluir a conta: ", error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container bg-light-subtle my-5 py-5 px-5 rounded shadow-lg" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">Atualizar Perfil</h2>
        <form method="post" key={profile?.id} className="text-center">
          <div className="row mb-3 justify-content-center">
            <label htmlFor="user" className="col-sm-3 col-form-label">
              Usuário:
            </label>
            <div className="col-sm-9">
              <input
                id="user"
                type="text"
                placeholder="Insira seu novo usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className={`form-control ${error && !user ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">
                Preencha o campo de usuário!
              </div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Nome:
            </label>
            <div className="col-sm-9">
              <input
                id="name"
                type="text"
                placeholder="Insira seu novo nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`form-control ${error && !name ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">Preencha o campo de nome!</div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="cpf" className="col-sm-3 col-form-label">
              CPF:
            </label>
            <div className="col-sm-9">
              <input
                id="cpf"
                type="text"
                placeholder="Insira seu novo CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                className={`form-control ${error && !cpf ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">Preencha o campo de CPF!</div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="city" className="col-sm-3 col-form-label">
              Cidade:
            </label>
            <div className="col-sm-9">
              <input
                id="city"
                type="text"
                placeholder="Insira sua cidade"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={`form-control ${
                  error && !city ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">Preencha o campo cidade!</div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="creci" className="col-sm-3 col-form-label">
              CRECI:
            </label>
            <div className="col-sm-9">
              <input
                id="creci"
                type="text"
                placeholder="Insira seu CRECI"
                value={creci}
                onChange={(e) => setCreci(e.target.value)}
                className={`form-control ${
                  error && !creci ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">Preencha o campo CRECI!</div>
            </div>
          </div>

          <div className="row mb-3 justify-content-center">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Celular:
            </label>
            <div className="col-sm-9">
              <InputMask
                id="phone"
                type="text"
                mask="(99) 99999-9999"
                maskChar={null}
                placeholder="Insira o número do celular"
                value={phone}
                onChange={handlePhoneChange}
                onBlur={handlePhoneBlur}
                className={`form-control ${
                  error && !validatePhone(phone) ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                {error || "Telefone inválido!"}
              </div>
            </div>
          </div>

          <div className="row mb-3  col-sm-9 offset-sm-3 justify-content-center">
            <div className="row">
              <div className="form-check col">
                <input
                  type="radio"
                  className="form-check-input"
                  id="changePasswordNo"
                  name="changePassword"
                  value="no"
                  checked={!changePassword}
                  onChange={() => setChangePassword(false)}
                />
                <label className="form-check-label" htmlFor="changePasswordNo">
                  Não quero alterar a senha
                </label>
              </div>
              <div className="form-check col">
                <input
                  type="radio"
                  className="form-check-input"
                  id="changePasswordYes"
                  name="changePassword"
                  value="yes"
                  checked={changePassword}
                  onChange={() => setChangePassword(true)}
                />
                <label className="form-check-label" htmlFor="changePasswordYes">
                  Quero alterar a senha
                </label>
              </div>
            </div>
          </div>

          {changePassword && (
            <div className="row mb-3 justify-content-center">
              <label htmlFor="password" className="col-sm-3 col-form-label">
                Nova Senha:
              </label>
              <div className="col-sm-9">
                <input
                  id="password"
                  type="password"
                  placeholder="Insira sua nova senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
              </div>
            </div>
          )}

          <div className="d-grid gap-2 d-md-flex mt-4 justify-content-end">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary text-light me-2"
            >
              Atualizar perfil
            </button>
            <button
              type="submit"
              onClick={handleDeleteAccount}
              className="btn btn-warning text-light"
            >
              Excluir perfil
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />
      <Footer />
    </>
  );
};

export default Profile;
