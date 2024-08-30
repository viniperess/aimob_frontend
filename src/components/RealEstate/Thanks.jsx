import "./Thanks.css";
import "bootstrap/dist/css/bootstrap.min.css";


const Thanks = ({ data }) => {
  return (
    <div className="thanks-container">
      <h2>Falta pouco...</h2>
      <p>Para concluir clique no botao enviar abaixo</p>
      <h3>Aqui esta o resumo do seu imóvel:</h3>
      <table className="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Image</th>
            <td>
              <a href="https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
                Image
              </a>
            </td>
            <th scope="row">Tipo</th>
            <td>{data.type}</td>
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
            <th scope="row">Descrição</th>
            <td colSpan="">{data.description}</td>
            <th scope="row">Valor</th>
            <td colSpan="">{data.salePrice}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Thanks;
