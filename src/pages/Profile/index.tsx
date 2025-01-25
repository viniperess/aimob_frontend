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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [creci, setCreci] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const navigate = useNavigate();


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value.replace(/[^0-9]/g, "");
    setPhone(newPhone);
  };

  const getProfile = async () => {
    try {
      const response = await api.get("users/profile");
      setProfile(response.data);
      setUser(response.data.user);
      setEmail(response.data.email);
      setName(response.data.name);
      setCpf(response.data.cpf);
      setCity(response.data.city);
      setPhone(response.data.phone);
      setCreci(response.data.creci);
      setImage(response.data.image);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setPasswordError("As senhas não coincidem!");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordError("As senhas não coincidem!");
    } else {
      setPasswordError("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (changePassword && password.length < 8) {
      setPasswordError("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    
    if (changePassword && password !== confirmPassword) {
      setPasswordError("As senhas não coincidem!");
      return;
    }
  
    try {
      // Usando FormData para garantir que a imagem e todos os campos sejam enviados corretamente
      const formData = new FormData();
      formData.append("user", user);
      formData.append("email", email);
      formData.append("name", name);
      formData.append("cpf", cpf);
      formData.append("city", city);
      formData.append("phone", phone);
      formData.append("creci", creci);
  
      // Adiciona a senha ao formData somente se houver um novo valor
      if (password) {
        formData.append("password", password);
      }
  
      // Adiciona a imagem ao formData, caso o usuário tenha selecionado uma nova
      if (newImage) {
        formData.append("image", newImage);
      }
  
      // Envia os dados usando o FormData
      await api.patch(`users/${profile?.id}`, formData);
  
      // Recarrega o perfil atualizado
      getProfile();
  
      if (password || user !== profile?.user) {
        toast.success("Perfil atualizado com sucesso! Você será deslogado.", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
          className: "custom-toast",
        });
        setTimeout(() => {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userName");
          navigate("/signin");
        }, 3000);
      } else {
        toast.success("Perfil atualizado com sucesso!", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 3000,
          className: "custom-toast",
        });
      }
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
      <div
        className="container bg-light-subtle my-5 py-5 px-5 rounded shadow-lg"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">Atualizar Perfil</h2>
        <div className="text-center mb-4">
          <label htmlFor="image">
            <img
              src={image || "/default-profile.png"}
              alt="Foto do Perfil"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

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
            <label htmlFor="email" className="col-sm-3 col-form-label">
              E-mail:
            </label>
            <div className="col-sm-9">
              <input
                id="email"
                type="email"
                placeholder="Insira seu novo e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${
                  error && !email ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">
                Preencha o campo de E-mail!
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
                className={`form-control ${error && !city ? "is-invalid" : ""}`}
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
                className="form-control"
              />
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
            <>
              <div className="row mb-3 justify-content-center">
                <label htmlFor="password" className="col-sm-3 col-form-label">
                  Nova Senha:
                </label>
                <div className="col-sm-9">
                  <input
                    id="password"
                    type="password"
                    placeholder="Insira sua nova senha"
                    title="A senha deve ter pelo menos 8 caracteres."
                    value={password}
                    onChange={handlePasswordChange}
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3 justify-content-center">
                <label
                  htmlFor="confirmPassword"
                  className="col-sm-3 col-form-label"
                >
                  Confirmar Senha:
                </label>
                <div className="col-sm-9">
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirme sua nova senha"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`}
                  />
                  {passwordError && (
                    <div className="invalid-feedback d-block">
                      {passwordError}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="d-grid gap-2 d-md-flex mt-4 justify-content-end">
            <button
              type="submit"
              onClick={handleDeleteAccount}
              className="btn btn-warning text-light"
            >
              Excluir perfil
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary text-light me-2"
            >
              Atualizar perfil
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
