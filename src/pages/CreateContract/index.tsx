import React, { FormEvent, useEffect, useState } from "react";
import { User, Role } from "../../types/user";
import { RealEstateType } from "../../types/realEstate";
import { useNavigate } from "react-router-dom";
import api from "../../service/api";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const fetchUsers = async () => {
  try {
    const response = await api.get("/users");
    console.log("Users data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const fetchRealEstates = async () => {
  try {
    const response = await api.get("/realestates");
    console.log("Real Estates data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching real estates:", error);
    return [];
  }
};

const CreateContract: React.FC = () => {
  const [contractType, setContractType] = useState("");
  const [formOfPayment, setFormOfPayment] = useState("");
  // const [date, setDate] = useState("");
  const [finalValue, setFinalValue] = useState("");
  // const [commission, setCommission] = useState("");
  const [userId, setUserId] = useState("");
  const [clientUserId, setClientUserId] = useState("");
  const [estateId, setEstateId] = useState("");
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState<User[]>([]);
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const navigate = useNavigate();

  // const handleChangeFinalValue = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFinalValue(formatCurrency(e.target.value));
  // };
  console.log(users);
  
  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      console.log("Users Profile data:", response.data);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching users profile:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("Users:", usersData);
        setUsers(usersData);
        const clientsData = usersData.filter(
          (user: User) => user?.roles === Role.CLIENT
        );

        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRealEstatesData = async () => {
      try {
        const realEstatesData = await fetchRealEstates();
        console.log("Real Estates:", realEstatesData);
        setRealEstates(realEstatesData);
      } catch (error) {
        console.error("Error fetching real estates:", error);
      }
    };
  
    fetchData();
    fetchProfile();
    fetchRealEstatesData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const finalValueInThousands = parseFloat(finalValue.replace(",", ".")) * 1000;

    const commissionPercentage = 6;
    const calculatedCommission = (finalValueInThousands * commissionPercentage) / 100;
    const finalValueAfterCommission = finalValueInThousands - calculatedCommission;
    try {
      await api.post("/contracts", {
        contractType,
        formOfPayment,
        // date,
        finalValue: finalValueAfterCommission.toString(), // Armazena em milhares
        commission: calculatedCommission.toString(), // Comissão em milhares
        userId: userId,
        clientUserId:
          typeof clientUserId === "number"
            ? clientUserId
            : parseInt(clientUserId, 10),
        estateId: typeof estateId === "number" ? estateId : parseInt(estateId, 10),
      });
      console.log("Requisição bem-sucedida!");
      navigate("/");
    } catch (error) {
      console.error(
        "HandleSubmit Contract: Erro ao inserir o contrato.",
        error
      );
    }
  };
  return (
    <>
      <Navbar />

      <h1 className="text-center shadow fw-bolder py-2 my-3">
        Inserir Contrato
      </h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder">
          Formulário de criação de contrato
        </h2>
        <form
          className="row row-cols-lg-auto g-3 align-items-center"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label className="visually-hidden" htmlFor="finalValue">
              Valor
            </label>
            <div className="input-group">
              <div className="input-group-text">R$</div>
              <input
                type="text"
                className="form-control"
                aria-describedby="finalValueFeedback"
                id="finalValue"
                placeholder="Valor"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="contractType">
              Tipo de Contrato
            </label>
            <select
              className="form-select"
              id="contractType"
              value={contractType}
              onChange={(e) => setContractType(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione o tipo do contrato...
              </option>
              <option value="Compra">Compra</option>
              <option value="Alugel">Aluguel</option>
            </select>
          </div>

          <div className="col-12">
            <label className="visually-hidden" htmlFor="formOfPayment">
              Forma de Pagamento
            </label>
            <select
              className="form-select"
              id="formOfPayment"
              value={formOfPayment}
              onChange={(e) => setFormOfPayment(e.target.value)}
              required
            >
              <option selected>Selecione a forma de pagamento...</option>
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartao">Cartão</option>
              <option value="Pix">Pix</option>
            </select>
          </div>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="clientUserId">
              Cliente
            </label>
            <select
              className="form-select"
              id="clientUserId"
              value={clientUserId}
              onChange={(e) => setClientUserId(e.target.value)}
            >
              <option disabled value="">
                Selecione o comprador...
              </option>
              {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client) => (
                  <option value={client?.id} key={client?.id}>
                    {client?.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum comprador disponível
                </option>
              )}
            </select>
          </div>
          <div className="col-12">
            <label className="visually-hidden" htmlFor="estateId">
              Imóvel
            </label>
            <select
              className="form-select"
              id="estateId"
              value={estateId}
              onChange={(e) => setEstateId(e.target.value)}
            >
              <option disabled value="">
                Seleciona o imóvel...
              </option>
              {Array.isArray(realEstates) && realEstates.length > 0 ? (
                realEstates.map((realEstate) => (
                  <option value={realEstate?.id} key={realEstate?.id}>
                    {realEstate?.registration}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum imóvel disponível
                </option>
              )}
            </select>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="inlineFormCheck"
              />
              <label className="form-check-label" htmlFor="inlineFormCheck">
                Concordo com os termos
              </label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateContract;
