import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { RealEstateType } from "../../types/realEstate";
import api from "../../service/api";
import { ToastContainer, toast } from "react-toastify";
import './styles.css';
// import { Container } from './styles';

const EditRealEstate: React.FC = () => {
  const { id } = useParams();
  const [realEstate, setRealEstate] = useState<RealEstateType>();
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
  const navigate = useNavigate();

  const getRealEstate = useCallback(async () => {
    try {
      const response = await api.get(`realestates/${id}`);
      setRealEstate(response.data);
      setStreet(response.data.street);
      setNumber(response.data.number);
      setComplement(response.data.complement);
      setDistrict(response.data.district);
      setZipCode(response.data.zipCode);
      setCity(response.data.city);
      setState(response.data.state);
      setBuiltArea(response.data.builtArea);
      setTotalArea(response.data.totalArea);
      setBedrooms(response.data.bedrooms);
      setBathrooms(response.data.bathrooms);
      setLivingRooms(response.data.livingRooms);
      setKitchens(response.data.kitchens);
      setGarage(response.data.garage);
      setType(response.data.type);
      setDescription(response.data.description);
      setSalePrice(response.data.salePrice);
      setRentPrice(response.data.rentPrice);
      setStatus(response.data.status);
      setRegistration(response.data.registration);
    } catch (error) {
      console.error("GetREALESTATE: Erro ao buscar dados", error);
    }
  }, [id]); 

  useEffect(() => {
    const fetchRealEstateData = async () => {
      try {
        await getRealEstate();
      } catch (error) {
        console.error("Error fetching real estate data:", error);
      }
    };
  
    fetchRealEstateData();
  }, [getRealEstate]); //

  const handleUpdateRealEstate = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await api.put(`realestates/${realEstate?.id}`, {
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
      });

      getRealEstate();

      toast.success("Imóvel atualizado com sucesso!\nParabéns!", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 3000,
        className: "custom-toast",
      });
      setTimeout(() => {
        navigate(-1);
      }, 4000);
    } catch (error) {
      console.error("Update Real Estate: Erro ao atualizar: ", error);
    }
  };

  const handleDeleteRealEstate = async (e: FormEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir seu projeto? Esta ação é irreversível."
    );

    if (confirmDelete) {
      try {
        await api.delete(`realestates/${realEstate?.id}`);
        navigate("/");
      } catch (error) {
        console.error("Delete Real Estate: Erro ao excluir", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      <div className="container bg-light-subtle">
      
        <form method="post" key={realEstate?.id}>
        <div className="my-4">
            <label htmlFor="zipCode" className="form-label fw-medium">
              Cep
            </label>
            <input
              type="text"
              placeholder="Cep do imóvel"
              id="zipCode"
              aria-describedby="zipCodeFeedback"
              value={zipCode}
            //   onBlur={addressSearch}
              onChange={(e) => setZipCode(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="my-4">
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
          <div className="d-grid gap-2 d-md-flex mt-5">
            <button
              type="submit"
              onClick={handleUpdateRealEstate}
              className="btn btn-info text-light"
            >
              Atualizar Imovel
            </button>
            <button
              type="submit"
              onClick={handleDeleteRealEstate}
               
            >
              Excluir Imovel
            </button>
          </div>
        </form>
      </div>

      <ToastContainer autoClose={3000} className="custom-toast" />
      <Footer />
    </>
  );
};

export default EditRealEstate;
