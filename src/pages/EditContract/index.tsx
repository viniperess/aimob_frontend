import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { RealEstateType } from "../../types/realEstate";
import api from "../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
// import "./styles.css";
import { Contract } from "../../types/contract";
import { User, Role } from "../../types/user";
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
const EditContract: React.FC = () => {
  const { id } = useParams();
  const [contract, setContract] = useState<Contract>();
  const [contractType, setContractType] = useState("");
  const [formOfPayment, setFormOfPayment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [commission, setCommission] = useState("");
  const [estateId, setEstateId] = useState("");
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);
  const [clientUserId, setClientUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState<User[]>([]);

  const navigate = useNavigate();

  const getContract = async () => {
    try {
      const response = await api.get(`contracts/${id}`);
      setContract(response.data);
      setContractType(response.data.contractType);
      setFormOfPayment(response.data.formOfPayment);
      setFinalValue(response.data.finalValue);
    } catch (error) {
      console.error("GetContract, Erro ao buscar contratos.", error);
    }
  };

  useEffect(() => {
    const fetchRealEstatesData = async () => {
      try {
        const realEstatesData = await fetchRealEstates();
        console.log("Real Estates:", realEstatesData);
        setRealEstates(realEstatesData);
      } catch (error) {
        console.error("Error fetching real estates:", error);
      }
    };

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

    fetchData();
    fetchRealEstatesData();
    getContract();
  }, []);

  const handleUpdateContract = async (e: FormEvent) => {
    e.preventDefault();
    const finalValueInThousands =
      parseFloat(finalValue.replace(",", ".")) * 1000;

    const commissionPercentage = 6;
    const calculatedCommission =
      (finalValueInThousands * commissionPercentage) / 100;
    const finalValueAfterCommission = finalValueInThousands - calculatedCommission;

    try {
      await api.put(`contracts/${contract?.id}`, {
        contractType,
        formOfPayment,
        finalValue: finalValueAfterCommission.toString(),
        commission: calculatedCommission.toString(), // Comissão em milhares
      });

      getContract();

      toast.success("Imóvel atualizado com sucesso!\nParabéns!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      console.error("Handle Update Contract: Erro ao Atualizar.", error);
    }
  };

  const handleDeleteContract = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir seu projeto? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`contracts/${contract?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Delete Contract: Erro ao excluir", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <h1 className="text-center shadow fw-bolder py-2 my-3">Editar Imóvel</h1>
      <div className="container bg-light-subtle border border-2 rounded shadow my-5 py-5 px-5">
        <h2 className="text-center fw-bolder mb-5">Informações do Imóvel</h2>
        <div className="alert alert-warning" role="alert">
          <ExclamationCircleIcon />
          Atenção! Se desejar editar os valores de meta, data de expiração ou
          imagens, será necessário a criação de um novo projeto.
        </div>
        <form method="post" key={contract?.id}>
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
            >
              <option value={""} disabled>
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
            >
              <option disabled value="">Selecione a forma de pagamento...</option>
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
              disabled
            >
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
              disabled
            >
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
          <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5">
            <button
              type="submit"
              onClick={handleUpdateContract}
              className="btn btn-info text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Atualizar Contrato
            </button>
            <button
              type="submit"
              onClick={handleDeleteContract}
              className="btn btn-danger text-light fw-medium rounded-pill shadow fs-4 px-4 py-2"
            >
              Excluir Contrato
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />
      <Footer />
    </>
  );
};

export default EditContract;
