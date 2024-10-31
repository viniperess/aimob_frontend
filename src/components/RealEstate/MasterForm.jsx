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
    if (!id) return;
    try {
      const response = await api.get(`realestates/${id}`);
      setFormData(response.data);
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
      const formDataObj = new FormData();
    

    if (formData.images && formData.images.length > 0) {
      formData.images.forEach((file) => {
        console.log('Selected file:', file);
        formDataObj.append("images", file);
      });
    }
    if (formData.salePrice) {
      formDataObj.append("salePrice", parseFloat(formData.salePrice));
    }

    Object.keys(formData).forEach((key) => {
      if (key !== "images" && key !== "salePrice") {
        formDataObj.append(key, formData[key]);
      }
    });
    console.log("Conteúdo do formDataObj:");
    for (let [key, value] of formDataObj.entries()) {
      console.log(`${key}:`, value);
    }


      const token = localStorage.getItem("token");
      const response = await api[method](url,  formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response from API:', response.data);

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
                 className="bg-warning text-white"
                  type="button"
                  onClick={() => changeStep(currentStep - 1)}
                >
                  <GrFormPrevious />
                  <span>Voltar</span>
                </button>
              )}
              {!isLastStep ? (
                <button type="submit" className="btn text-light fw-medium bg-primary">
                  <span>Avançar</span>
                  <GrFormNext />
                </button>
              ) : (
                <button type="button" className="btn text-light fw-medium bg-primary" onClick={(e) => handleSubmit(e)}>
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
