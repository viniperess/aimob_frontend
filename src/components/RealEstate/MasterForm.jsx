import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import StepOne from "./StepOne";
import Thanks from "./Thanks";
import "./Masterform.css";
import Steps from "./Steps";
import { useCallback, useEffect, useState } from "react";
import "./index.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import api from "../../service/api";
import StepTwo from "./StepTwo";
import { useNavigate, useParams } from "react-router-dom";

const MasterForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();


  const getRealEstate = useCallback(async () => {
    if (!id) return; // Se não tiver ID, é uma nova inserção
    try {
      const response = await api.get(`realestates/${id}`);
      setFormData(response.data); // Carregar dados do imóvel no estado do formulário
    } catch (error) {
      console.error("Erro ao buscar dados do imóvel:", error);
    }
  }, [id]);

  useEffect(() => {
    getRealEstate();
  }, [getRealEstate]);


  const handleChange = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id ? `/realestates/${id}` : "/realestates";
      const method = id ? "patch" : "post";

      const payload = {
        ...formData,
        images: formData.images || [
          "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
      };

      await api[method](url, payload);
      
      navigate("/");
    } catch (error) {
      console.error("Erro ao processar o formulário:", error);
    }
  };
  const steps = {
    1: <StepOne onChange={handleChange} data={formData} />,
    2: <StepTwo onChange={handleChange} data={formData} />,
    3: <Thanks data={formData} onSubmit={handleSubmit} />,
  };

  const changeStep = (step) => {
    setCurrentStep(step);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === Object.keys(steps).length;

  return (
    <>
      <Navbar />
      <div className="masterform">
        <div className="header">
         <h2>{id ? "Editar Imóvel" : "Insira o Imóvel"}</h2>
        </div>

        <div className="form-container">
          <Steps currentStep={currentStep} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isLastStep) {
                handleSubmit(e);
              } else {
                changeStep(currentStep + 1);
              }
            }}
          >
            <div className="inputs-container">{steps[currentStep]}</div>
            <div className="actions">
              {!isFirstStep && (
                <button
                 className="bg-primary"
                  type="button"
                  onClick={() => changeStep(currentStep - 1)}
                >
                  <GrFormPrevious />
                  <span>Voltar</span>
                </button>
              )}
              {!isLastStep ? (
                <button type="submit" className="btn text-light fw-medium">
                  <span>Avançar</span>
                  <GrFormNext />
                </button>
              ) : (
                <button type="button" className="bg-primary" onClick={(e) => handleSubmit(e)}>
                  <span>Enviar</span>
                  <FiSend />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MasterForm;
