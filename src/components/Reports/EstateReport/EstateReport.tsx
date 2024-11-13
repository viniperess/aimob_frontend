import React, { useState, useEffect } from "react";
import api from "../../../service/api";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import PriceRangeSlider from "./PriceRangeSlider";
import "./RealEstateReport.css";
const RealEstateReport: React.FC = () => {
  const [realEstates, setRealEstates] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    minPrice: 0,
    maxPrice: 1000000,
    status: "all",
  });
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [loading, setLoading] = useState(false);
  const [totalRealEstates, setTotalRealEstates] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePriceChange = (values: number[]) => {
    setFilters({ ...filters, minPrice: values[0], maxPrice: values[1] });
    setPriceRange(values);
  };

  const fetchRealEstates = async () => {
    setLoading(true);
    try {
      const response = await api.get("realestates", { params: filters });
      setRealEstates(response.data);
      setTotalRealEstates(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar imóveis:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealEstates();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setErrorMessage("");

    const appliedFilters = {
      bedrooms: filters.bedrooms ? filters.bedrooms : undefined,
      bathrooms: filters.bathrooms ? filters.bathrooms : undefined,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      status: filters.status !== "all" ? filters.status : undefined,
    };

    try {
      console.log("Filtros aplicados:", appliedFilters);
      const token = localStorage.getItem("token");
      const response = await api.get(`/realestates/report`, {
        params: appliedFilters,
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio-imoveis.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao gerar o relatório:", error);
      setErrorMessage("Erro ao gerar o relatório de imóveis. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4 px-0">
        <h2 className="text-center mb-4">Relatório de Imóveis</h2>

        <p className="m-3">
          Total de imóveis cadastrados: <strong>{totalRealEstates}</strong>
        </p>
        {errorMessage && (
          <div className="alert alert-danger text-center" role="alert">
            {errorMessage}
            <button
              type="button"
              className="close"
              onClick={() => setErrorMessage("")}
            >
              &times;
            </button>
          </div>
        )}
        <Form.Group className="row no-gutters">
          <Form.Group controlId="bedroomsSelect" className="m-3 mb-0 col-2">
            <Form.Label>Quartos</Form.Label>
            <Form.Control
              as="select"
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="1">1 quarto</option>
              <option value="2">2 quartos</option>
              <option value="3">3 quartos</option>
              <option value="4">4 quartos</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="bathroomsSelect" className="m-3 mb-0 col-2">
            <Form.Label>Banheiros</Form.Label>
            <Form.Control
              as="select"
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="1">1 banheiro</option>
              <option value="2">2 banheiros</option>
              <option value="3">3 banheiros</option>
              <option value="4">4 banheiros</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="statusSelect" className="row no-gutters">
          <Form.Group controlId="salesPriceSelect" className="m-3 mb-0 col-2">
            <PriceRangeSlider onPriceChange={handlePriceChange} />
          </Form.Group>
          <Form.Group controlId="statusSelect" className="m-3 mb-0 col-2">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="all">Todos</option>
              <option value="true">Disponível</option>
              <option value="false">Indisponível</option>
            </Form.Control>
          </Form.Group>
        </Form.Group>

        <Button
          className="d-flex justify-content-center mb-4 m-3 col-2"
          onClick={handleGenerateReport}
          disabled={loading}
        >
          {loading ? "Gerando Relatório..." : "Baixar Relatório"}
        </Button>

        <div className="table-responsive px-0 mt-3">
          <table className="table table-hover table-bordered w-100">
            <thead className="text-center text-white">
              <tr>
                <th className="bg-primary text-white">ID</th>
                <th className="bg-primary text-white">Endereço</th>
                <th className="bg-primary text-white">Quartos</th>
                <th className="bg-primary text-white">Banheiros</th>
                <th className="bg-primary text-white">Preço de Venda</th>
                <th className="bg-primary text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {realEstates.map((realEstate) => (
                <tr key={realEstate.id}>
                  <td>
                    <Link to={`/realestate/${realEstate.id}`}>
                      {realEstate.id}
                    </Link>
                  </td>
                  <td>{`${realEstate.street}, ${realEstate.city}, ${realEstate.state}`}</td>
                  <td>{realEstate.bedrooms || "N/A"}</td>
                  <td>{realEstate.bathrooms || "N/A"}</td>
                  <td>
                    {realEstate.salePrice
                      ? `R$ ${realEstate.salePrice.toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td>{realEstate.status ? "Disponível" : "Indisponível"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RealEstateReport;
