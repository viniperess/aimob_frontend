import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:3001/api/v1/",
  baseURL: "https://aimob-backend-viniperess.vercel.app/api/v1/",
});

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const cep = config.params?.cep;
  if (cep) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const addressData = response.data;

      config.params.street = addressData.logradouro || "";
      config.params.district = addressData.bairro || "";
      config.params.city = addressData.localidade || "";
      config.params.state = addressData.uf || "";
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  }

  return config;
});

export default api;
