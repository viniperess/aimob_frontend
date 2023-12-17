import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../service/api";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User>();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [dateType, setDateType] = useState("text");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState<string>("");
  const [creci, setCreci] = useState("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [roles, setRoles] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  var data = birthdate;
  var data_array = data.split("-");

  if (data_array[0].length !== 4 && data_array[0].length <= 4) {
    data = data_array[2] + "-" + data_array[1] + "-" + data_array[0];
  }
  var hoje = new Date();
  var nasc = new Date(data);
  var idade = hoje.getFullYear() - nasc.getFullYear();
  var m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;

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
      //   setEmail(response.data.email);
      setCpf(response.data.cpf);
      setStreet(response.data.street);
      setBirthdate(response.data.birthdate);

      setNumber(response.data.number);
      setComplement(response.data.complement);
      setDistrict(response.data.district);
      setCity(response.data.city);
      setZipCode(response.data.zipCode);
      setPhone(response.data.phone);
      setCreci(response.data.creci);
      setIsAdmin(response.data.isAdmin);
      setRoles(response.data.roles);
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
        birthdate,
        street,
        number,
        complement,
        district,
        city,
        zipCode,
        phone,
        creci,
        isAdmin,
        roles,
      };

      await api.put(`users/${profile?.id}`, data);

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
      <h1 className="text-center shadow fw-bolder py-2 my-3">Perfil</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do usuário</h2>
        <form method="post" key={profile?.id}>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="user"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Usuário:
            </label>
            <input
              id="user"
              type="text"
              aria-describedby="userAria"
              placeholder="Insira seu novo user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className={
                error && !user
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="userAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de usuário!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="name"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Nome:
            </label>
            <input
              id="name"
              type="text"
              aria-describedby="nameAria"
              placeholder="Insira seu novo nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={
                error && !name
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="nameAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de nome!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="cpf"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Cpf:
            </label>
            <input
              id="cpf"
              type="text"
              aria-describedby="cpfAria"
              placeholder="Insira seu novo cpf"
              value={cpf}
              onChange={(e) => setUser(e.target.value)}
              className={
                error && !user
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="cpfAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de cpf!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="date"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Data de nascimento:
            </label>
            <input
              type={dateType}
              id="date"
              aria-describedby="dateAria"
              placeholder="Insira sua data de nascimento"
              value={birthdate}
              onFocus={() => setDateType("date")}
              onChange={(e) => [setBirthdate(e.target.value), setError("")]}
              className={
                (error && !birthdate) || idade < 18 || idade > 100
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="dateAria"
              className="invalid-feedback text-center fw-medium"
            >
              Você precisa ter 18 anos ou mais!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="street"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Rua:
            </label>
            <input
              id="street"
              type="text"
              aria-describedby="textAria"
              placeholder="Insire sua rua: "
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              className={
                error && !street
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="streetAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de rua!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="number"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Número:
            </label>
            <input
              id="number"
              type="text"
              aria-describedby="numberAria"
              placeholder="Insire o número: "
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={
                error && !number
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="numberAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo de número!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="complement"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Complemento:
            </label>
            <input
              id="complement"
              type="text"
              aria-describedby="complementAria"
              placeholder="Insire seu complemento: "
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className={
                error && !complement
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="complementAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo complemento!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="zipCode"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              CEP:
            </label>
            <input
              id="zipCode"
              type="text"
              aria-describedby="zipCodeAria"
              placeholder="Insire seu cep: "
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className={
                error && !zipCode
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="zipCodeAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo cep!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="city"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Cidade:
            </label>
            <input
              id="city"
              type="text"
              aria-describedby="cityAria"
              placeholder="Insire sua cidade: "
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={
                error && !city
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="cityAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo cidade!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="district"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Bairro:
            </label>
            <input
              id="district"
              type="text"
              aria-describedby="districtAria"
              placeholder="Insire seu bairro: "
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className={
                error && !district
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="districtAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo bairro!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="creci"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Creci:
            </label>
            <input
              id="creci"
              type="text"
              aria-describedby="zipCodeAria"
              placeholder="Insire seu creci: "
              value={creci}
              onChange={(e) => setCreci(e.target.value)}
              className={
                error && !creci
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="creciAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo creci!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="roles"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Função:
            </label>
            <input
              id="roles"
              type="text"
              aria-describedby="rolesAria"
              placeholder="Insire sua função: "
              value={roles}
              onChange={(e) => setRoles(e.target.value)}
              className={
                error && !roles
                  ? "profile-input form-control is-invalid col-1 w-50"
                  : "profile-input form-control col-1 w-50"
              }
            />
            <div
              id="rolesAria"
              className="invalid-feedback text-center fw-medium"
            >
              Preencha o campo Função!
            </div>
          </div>
          <div className="row mx-0 mb-5 fw-medium">
            <label
              htmlFor="isAdmin"
              className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
            >
              Admin:
            </label>
            <select
              id="isAdmin"
              aria-describedby="isAdminAria"
              value={isAdmin.toString()} // Convertemos o valor booleano para string
              onChange={(e) => setIsAdmin(e.target.value === "true")}
              className="form-select col-1 w-50"
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
            <div
              id="isAdminAria"
              className="invalid-feedback text-center fw-medium"
            >
              {/* Preencha o campo Admin! (Se desejar mostrar uma mensagem de erro) */}
            </div>
          </div>
     <div className="row mx-0 mb-5 fw-medium">
        <label
          htmlFor="phone"
          className="offset-sm-1 w-25 px-0 pt-2 fw-medium"
        >
          Celular:
        </label>
        <InputMask
          id="phone"
          type="text"
          mask="99999-9999"
          maskChar={null}
          aria-describedby="phoneAria"
          placeholder="Insira o número do celular"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          className={
            error && !validatePhone(phone)
              ? "profile-input form-control is-invalid col-1 w-50"
              : "profile-input form-control col-1 w-50"
          }
        />
        <div
          id="phoneAria"
          className="invalid-feedback text-center fw-medium"
        >
          {error || "Telefone inválido!"}
        </div>
      </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Atualizar perfil
            </button>
            <button
              type="submit"
              onClick={handleDeleteAccount}
              className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
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
