import React, { FormEvent, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import api from "../../service/api";
import axios from "axios";
import { User, Role } from "../../types/user";

const zipCodeSearch = async (cep: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar o CEP", error);
    return null;
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

const CreateRealEstate: React.FC = () => {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [builtArea, setBuiltArea] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [bedrooms, setBedrooms] = useState<number | string>(0);
  const [bathrooms, setBathrooms] = useState<number | string>(0);
  const [livingRooms, setLivingRooms] = useState<number | string>(0);
  const [kitchens, setKitchens] = useState<number | string>(0);
  const [garage, setGarage] = useState(false);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [status, setStatus] = useState(false);
  const [registration, setRegistration] = useState("");
  const [images, setImages] = useState<FileList | null>(null);
  const [userId, setUserId] = useState("");
  const [clientUserId, setClientUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState<User[]>([]);
  const navigate = useNavigate();
  console.log(users,images);
  
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

  const addressSearch = async () => {
    if (zipCode) {
      const address = await zipCodeSearch(zipCode);
      if (address) {
        setStreet(address.logradouro);
        setCity(address.localidade);
        setDistrict(address.bairro);
        setState(address.uf);
      }
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

    fetchData();

    fetchProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    console.log("Dados da requisição:", {
      street,
      number,
      complement,
      district,
      zipCode,
      city,
      state,
      builtArea,
      totalArea,
      bedrooms:
        typeof bedrooms === "number" ? bedrooms : parseInt(bedrooms, 10),
      bathrooms:
        typeof bathrooms === "number" ? bathrooms : parseInt(bathrooms, 10),
      livingRooms:
        typeof livingRooms === "number"
          ? livingRooms
          : parseInt(livingRooms, 10),
      kitchens:
        typeof kitchens === "number" ? kitchens : parseInt(kitchens, 10),
      garage,
      type,
      description,
      salePrice,
      rentPrice,
      status,
      registration,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
      userId: userId,
      clientUserId:
        typeof clientUserId === "number"
          ? clientUserId
          : parseInt(clientUserId, 10),
    });

    try {
      const url = "realestates";
      console.log("URL da requisição:", url);
      await api.post("/realestates", {
        street,
        number,
        complement,
        district,
        zipCode,
        city,
        state,
        builtArea,
        totalArea,
        bedrooms:
          typeof bedrooms === "number" ? bedrooms : parseInt(bedrooms, 10),
        bathrooms:
          typeof bathrooms === "number" ? bathrooms : parseInt(bathrooms, 10),
        livingRooms:
          typeof livingRooms === "number"
            ? livingRooms
            : parseInt(livingRooms, 10),
        kitchens:
          typeof kitchens === "number" ? kitchens : parseInt(kitchens, 10),
        garage,
        type,
        description,
        salePrice,
        rentPrice,
        status,
        registration,
        images: [
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        userId: userId,
        clientUserId:
          typeof clientUserId === "number"
            ? clientUserId
            : parseInt(clientUserId, 10),
      });
      console.log("Requisição bem-sucedida!");
      navigate("/");
    } catch (error) {
      console.error("Error creating real estate:", error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container  my-5 py-5 px-5">
      
        <form method="post" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="zipCode" className="form-label fw-medium">
              Cep
            </label>
            <input
              type="text"
              placeholder="Cep do imóvel"
              id="zipCode"
              aria-describedby="zipCodeFeedback"
              value={zipCode}
              onBlur={addressSearch}
              onChange={(e) => setZipCode(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="street" className="form-label fw-medium">
              Rua
            </label>
            <input
              type="text"
              placeholder="Rua do imóvel"
              id="street"
              value={street}
              onChange={(e) => [setStreet(e.target.value)]}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-medium">
              Número
            </label>
            <input
              placeholder="Número do imóvel"
              id="text"
              aria-describedby="descriptionFeedback"
              value={number}
              onChange={(e) => [setNumber(e.target.value)]}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="complement" className="form-label fw-medium">
              Complemento
            </label>
            <input
              type="text"
              placeholder="Complemento do imóvel"
              id="complement"
              aria-describedby="complementFeedback"
              value={complement}
              onChange={(e) => [setComplement(e.target.value)]}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="district" className="form-label fw-medium">
              Bairro
            </label>
            <input
              type="text"
              placeholder="Bairro do imóvel"
              id="district"
              aria-describedby="districtFeedback"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label fw-medium">
              Cidade
            </label>
            <input
              type="text"
              placeholder="Cidade do imóvel"
              id="city"
              aria-describedby="cityFeedback"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="state" className="form-label fw-medium">
              Estado
            </label>
            <input
              type="text"
              placeholder="Bairro do imóvel"
              id="state"
              aria-describedby="stateFeedback"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="builtArea" className="form-label fw-medium">
              Área Construída
            </label>
            <input
              type="text"
              placeholder="Área construída do imóvel"
              id="builtArea"
              aria-describedby="builtAreaFeedback"
              value={builtArea}
              onChange={(e) => setBuiltArea(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalArea" className="form-label fw-medium">
              Área Total
            </label>
            <input
              type="text"
              placeholder="Área total do imóvel"
              id="totalArea"
              aria-describedby="totalAreaFeedredenback"
              value={totalArea}
              onChange={(e) => setTotalArea(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bedrooms" className="form-label fw-medium">
              Quartos
            </label>
            <input
              type="text"
              placeholder="Quartos do imóvel"
              id="bedrooms"
              aria-describedby="bedroomsFeedback"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bathrooms" className="form-label fw-medium">
              Banheiros
            </label>
            <input
              type="text"
              placeholder="Banheiros do imóvel"
              id="bathrooms"
              aria-describedby="bathroomsFeedback"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="livingRooms" className="form-label fw-medium">
              Salas
            </label>
            <input
              type="text"
              placeholder="Salas do imóvel"
              id="livingrooms"
              aria-describedby="livingRoomsFeedback"
              value={livingRooms}
              onChange={(e) => setLivingRooms(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="kitchens" className="form-label fw-medium">
              Kitchens
            </label>
            <input
              type="text"
              placeholder="Kitchens do imóvel"
              id="kitchens"
              aria-describedby="kitchensFeedback"
              value={kitchens}
              onChange={(e) => setKitchens(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="garage" className="form-label fw-medium">
              Garagem
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                id="garage"
                checked={garage}
                onChange={(e) => setGarage(e.target.checked)}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="garage">
                {garage ? "Sim" : "Não"}
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label fw-medium">
              Tipo
            </label>
            <select
              className="form-select"
              id="type"
              aria-label="Select Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecione o tipo do imóvel
              </option>
              <option value="HOUSE">Casa</option>
              <option value="APARTMENT">Apartamento</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-medium">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descrição do imóvel"
              id="description"
              aria-describedby="descriptionFeedback"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="salePrice" className="form-label fw-medium">
              Preço de Venda
            </label>
            <input
              type="text"
              placeholder="Preço de venda do imóvel"
              id="salePrice"
              aria-describedby="salePriceFeedback"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="rentPrice" className="form-label fw-medium">
              Preço de Aluguel
            </label>
            <input
              type="text"
              placeholder="Preço de aluguel do imóvel"
              id="rentPrice"
              aria-describedby="rentPriceFeedback"
              value={rentPrice}
              onChange={(e) => setRentPrice(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label fw-medium">
              Disponível
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                id="status"
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
                className="form-check-input"
              />
              <label className="form-check-label" htmlFor="status">
                {status ? "Sim" : "Não"}
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="registration" className="form-label fw-medium">
              Registro
            </label>
            <input
              type="text"
              placeholder="Registro do imóvel"
              id="registration"
              aria-describedby="registrationFeedback"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="clientUserId" className="form-label fw-medium">
              Proprietário
            </label>
            <select
              className="form-select"
              id="clientUserId"
              aria-label="Select Category"
              required
              value={clientUserId}
              onChange={(e) => setClientUserId(e.target.value)}
            >
              <option value="" disabled>
                Selecione o proprietário
              </option>
              {Array.isArray(clients) && clients.length > 0 ? (
                clients.map((client) => (
                  <option key={client?.id} value={client?.id}>
                    {client?.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum proprietário disponível
                </option>
              )}
            </select>
          </div>
          {/* <div className="mb-3">
            <label htmlFor="category" className="form-label fw-medium">
              Proprietário
            </label>
            <select
              className="form-select"
              id="userId"
              aria-label="Select Category"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            >
              <option value="" disabled>
                Selecione o proprietário
              </option>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <option key={user?.id} value={user?.id}>
                    {user?.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Nenhum proprietário disponível
                </option>
              )}
            </select>
          </div> */}
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label fw-medium">
              Selecione imagens
            </label>
            <input
              className="form-control"
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setImages(e.target.files)}
              multiple
            />
          </div>
          <div className="d-grid gap-2 d-md-flex mt-4">
            <button
              type="submit"
              className="btn btn-info text-light fw-medium"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default CreateRealEstate;
