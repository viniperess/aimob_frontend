import axios from "axios";
import "./StepOne.css";
import { GiHouse, GiFamilyHouse } from "react-icons/gi";
import InputMask from "react-input-mask";
const StepOne = ({ data, onChange }) => {

  const fetchAddress = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;

      if (!addressData.erro) {
        onChange({
          ...data,
          street: addressData.logradouro || "",
          district: addressData.bairro || "",
          city: addressData.localidade || "",
          state: addressData.uf || "",
        });
      } else {
        console.error("CEP inválido");
        onChange({
          ...data,
          street: "",
          district: "",
          city: "",
          state: "",
        });
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      onChange({
        ...data,
        street: "",
        district: "",
        city: "",
        state: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      onChange({ [name]: value });
    } else {
      onChange({ [name]: value });
    }
    
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const cleanValue = value.replace(/\D/g, "");
    if (name === "zipCode" && cleanValue.length === 8) {
      fetchAddress(cleanValue);
    }
  };

  return (
    <div className="review-form">
      <div className="container score-container">
        <label className="radio-container">
          <input
            type="radio"
            value="apartamento"
            name="type"
            required
            checked={data.type === "apartamento"}
            onChange={handleInputChange}
          />
          <GiFamilyHouse />
          <p>Apartamento</p>
        </label>
        <label className="radio-container">
          <input
            type="radio"
            value="casa"
            name="type"
            required
            checked={data.type === "casa"}
            onChange={handleInputChange}
          />
          <GiHouse />
          <p>Casa</p>
        </label>
        <div className="mb-3 py-2">
          <label htmlFor="zipCode" className="form-label fw-medium">
            Cep
          </label>
            <InputMask
            mask="99999-999"
            placeholder="CEP do imóvel"
            id="zipCode"
            name="zipCode"
            aria-describedby="zipCodeFeedback"
            value={data.zipCode || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className="form-control"
            required
          />
        </div>
      </div>
      <div className="container my-3 py-2 px-5">
        
        <div className="row mb-1">
          <div className="col-6">
            <label htmlFor="street" className="form-label fw-medium">
              Rua
            </label>
            <input
              type="text"
              placeholder="Rua do imóvel"
              id="street"
              name="street"
              value={data.street || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-3">
            <label htmlFor="number" className="form-label fw-medium">
              Número
            </label>
            <input
              placeholder="Número do imóvel"
              id="number"
              type="text"
              name="number"
              aria-describedby="numberEstate"
              value={data.number || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-3">
            <label htmlFor="complement" className="form-label fw-medium">
              Complemento
            </label>
            <input
              placeholder="Complemento do imóvel"
              type="text"
              id="complement"
              name="complement"
              aria-describedby="complementEstate"
              value={data.complement || ""}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="district" className="form-label fw-medium">
              Bairro
            </label>
            <input
              type="text"
              placeholder="Bairro do imóvel"
              id="district"
              name="district"
              aria-describedby="districtEstate"
              value={data.district || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-3">
            <label htmlFor="city" className="form-label fw-medium">
              Cidade
            </label>
            <input
              type="text"
              placeholder="Cidade do imóvel"
              id="city"
              name="city"
              aria-describedby="cityFeedback"
              value={data.city || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-3">
            <label htmlFor="state" className="form-label fw-medium">
              Estado
            </label>
            <input
              type="text"
              placeholder="Estado do imóvel"
              id="state"
              name="state"
              aria-describedby="stateFeedback"
              value={data.state || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="registration" className="form-label fw-medium">
              Registro
            </label>
            <input
              type="text"
              placeholder="Registro do imóvel"
              id="registration"
              name="registration"
              aria-describedby="registrationFeedback"
              value={data.registration || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
