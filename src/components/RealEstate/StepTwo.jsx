import "./StepTwo.css";

const StepTwo = ({ data, onChange }) => {
  const handleInputChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    if (type === "checkbox") {
      onChange({ [name]: checked });
    } else if (files) {
      onChange({ [name]: Array.from(files) });
    } else {
      onChange({ [name]: value });
    }
  };

  return (
    <div>
      <div className="container my-2 py-2 px-5">
        <div className="row">
          <div className="col">
            <label htmlFor="description" className="form-label fw-medium">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descrição do imóvel"
              id="description"
              name="description"
              aria-describedby="descriptionFeedback"
              value={data.description || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="builtArea" className="form-label fw-medium">
              Área Construída
            </label>
            <input
              type="number"
              placeholder="Área construída do imóvel"
              id="builtArea"
              name="builtArea"
              aria-describedby="builtAreaFeedback"
              value={data.builtArea || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="totalArea" className="form-label fw-medium">
              Área Total
            </label>
            <input
              type="number"
              placeholder="Área total do imóvel"
              id="totalArea"
              name="totalArea"
              aria-describedby="totalAreaFeedback"
              value={data.totalArea || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="kitchens" className="form-label fw-medium">
              Cozinha
            </label>
            <input
              type="number"
              placeholder="Cozinhas do imóvel"
              id="kitchens"
              name="kitchens"
              aria-describedby="kitchensFeedback"
              value={data.kitchens || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <label htmlFor="bedrooms" className="form-label fw-medium">
              Quartos
            </label>
            <input
              type="number"
              placeholder="Quartos do imóvel"
              id="bedrooms"
              name="bedrooms"
              aria-describedby="bedroomsFeedback"
              value={data.bedrooms || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="bathrooms" className="form-label fw-medium">
              Banheiros
            </label>
            <input
              type="number"
              placeholder="Banheiros do imóvel"
              id="bathrooms"
              name="bathrooms"
              aria-describedby="bathroomsFeedback"
              value={data.bathrooms || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-4">
            <label htmlFor="livingRooms" className="form-label fw-medium">
              Salas
            </label>
            <input
              type="number"
              placeholder="Salas do imóvel"
              id="livingRooms"
              name="livingRooms"
              aria-describedby="livingRoomsFeedback"
              value={data.livingRooms || ""}
              onChange={handleInputChange}
              className="form-control"
              required
            />
          </div>
          <div className="row">
            <div className="col-6">
              <label htmlFor="salePrice" className="form-label fw-medium">
                Valor
              </label>
              <input
                type="number"
                placeholder="Valor do imóvel"
                id="salePrice"
                name="salePrice"
                aria-describedby="salePricesFeedback"
                value={data.salePrice}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="col">
              <label
                htmlFor="formFileMultiple"
                className="form-label fw-medium"
              >
                Selecione imagens
              </label>
              <input
                className="form-control"
                type="file"
                name="images"
                id="images"
                accept="image/*"
                onChange={handleInputChange}
                multiple
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-3">
              <label
                htmlFor="pool"
                id="poolText"
                className="form-label fw-medium"
              >
                Piscina
              </label>
              <div className="form-check one">
                <input
                  type="checkbox"
                  id="pool"
                  name="pool"
                  checked={data.pool || false}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="pool">
                  {data.pool ? "Sim" : "Não"}
                </label>
              </div>
            </div>
            <div className="col-3">
              <label
                htmlFor="yard"
                id="yardText"
                className="form-label fw-medium"
              >
                Pátio
              </label>
              <div className="form-check one">
                <input
                  type="checkbox"
                  id="yard"
                  name="yard"
                  checked={data.yard || false}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="yard">
                  {data.yard ? "Sim" : "Não"}
                </label>
              </div>
            </div>
            <div className="col-3">
              <label
                htmlFor="garage"
                id="garageText"
                className="form-label fw-medium"
              >
                Garagem
              </label>
              <div className="form-check one">
                <input
                  type="checkbox"
                  id="garage"
                  name="garage"
                  checked={data.garage || false}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="garage">
                  {data.garage ? "Sim" : "Não"}
                </label>
              </div>
            </div>

            <div className="col-3">
              <label
                htmlFor="status"
                id="statusText"
                className="form-label fw-medium"
              >
                Disponível
              </label>
              <div className="form-check two">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={data.status || false}
                  onChange={handleInputChange}
                  className="form-check-input"
                />
                <label className="form-check-label" htmlFor="status">
                  {data.status ? " Sim" : " Não"}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
