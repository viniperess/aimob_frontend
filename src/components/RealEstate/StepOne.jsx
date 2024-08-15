import "./StepOne.css";
import { GiHouse, GiFamilyHouse } from "react-icons/gi";

const StepOne = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      onChange({ [name]: value });
    } else {
      onChange({ [name]: value });
    }
  };

  return (
    <div className="review-form">
      <div className="container score-container">
        <label className="radio-container">
          <input
            type="radio"
            value="APARTMENT"
            name="type"
            required
            checked={data.type === "APARTMENT"}
            onChange={handleInputChange}
          />
          <GiFamilyHouse />
          <p>Apartamento</p>
        </label>
        <label className="radio-container">
          <input
            type="radio"
            value="HOUSE"
            name="type"
            required
            checked={data.type === "HOUSE"}
            onChange={handleInputChange}
          />
          <GiHouse />
          <p>Casa</p>
        </label>
        <div className="mb-3 py-2">
          <label htmlFor="zipCode" className="form-label fw-medium">
            Cep
          </label>
          <input
            type="text"
            placeholder="Cep do imóvel"
            id="zipCode"
            name="zipCode"
            aria-describedby="zipCodeFeedback"
            value={data.zipCode || ""}
            onChange={handleInputChange}
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
