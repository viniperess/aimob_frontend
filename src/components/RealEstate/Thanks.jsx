import "./Thanks.css";
import "bootstrap/dist/css/bootstrap.min.css";


const Thanks = ({ data, onChange  }) => {
  const handleInputChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    if (type === "checkbox") {
      onChange({ [name]: checked });
    }  else {
      onChange({ [name]: value });
    }
    console.log(`Updated ${name}:`, type === "checkbox" ? checked : value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="thanks-container">
      <h2>Falta pouco...</h2>
      <p>Para concluir clique no botao enviar abaixo</p>
      <h3>Aqui esta o resumo do seu imóvel:</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Tipo</th>
            <td>{data.type}</td>
            <th scope="row">Descrição</th>
            <td colSpan="">{data.description}</td>
          </tr>
          <tr>
            <th scope="row">Cep</th>
            <td>{data.zipCode}</td>
            <th scope="row">Rua</th>
            <td>{data.street}</td>
          </tr>
          <tr>
            <th scope="row">Numero</th>
            <td>{data.number}</td>
            <th scope="row">Complemento</th>
            <td>{data.complement}</td>
          </tr>
          <tr>
            <th scope="row">Bairro</th>
            <td>{data.district}</td>
            <th scope="row">Cidade</th>
            <td>{data.city}</td>
          </tr>
          <tr>
            <th scope="row">Estado</th>
            <td>{data.state}</td>
            <th scope="row">Registro</th>
            <td>{data.registration}</td>
          </tr>
          <tr>
            <th scope="row">Área Construída</th>
            <td>{data.builtArea}</td>
            <th scope="row">Área Total</th>
            <td>{data.totalArea}</td>
          </tr>
          <tr>
            <th scope="row">Quartos</th>
            <td>{data.bedrooms}</td>
            <th scope="row">Banheiros</th>
            <td>{data.bathrooms}</td>
          </tr>
          <tr>
            <th scope="row">Salas</th>
            <td>{data.livingRooms}</td>
            <th scope="row">Cozinha</th>
            <td>{data.kitchens}</td>
          </tr>
          <tr>
            <th scope="row">Garagem</th>
            <td>{data.garage ? "Sim" : "Não"}</td>
            <th scope="row">Status</th>
            <td>{data.status ? "Sim" : "Não"}</td>
          </tr>
          <tr>
            <th scope="row">Piscina</th>
            <td>{data.pool ? "Sim" : "Não"}</td>
            <th scope="row">Pátio</th>
            <td>{data.yard ? "Sim" : "Não"}</td>
          </tr>
          <tr>
            <th scope="row">Valor</th>
            <td colSpan="">{formatCurrency(data.salePrice)}</td>
            <th scope="row">Quantidade de Imagem</th>
            <td>{Array.isArray(data.images) ? data.images.length : 0}</td>
          </tr>
        </tbody>
      </table>
      <div className="form-check d-flex align-items-center justify-content-center">
        <label htmlFor="postToFacebook" className="form-check-label">
          Publicar este imóvel na página do Facebook
        </label>
        <input
          type="checkbox"
          className="form-check-input m-1"
          id="isPosted"
          name="isPosted"
          checked={data.isPosted || false}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Thanks;
