import React, { useEffect, useState } from "react";
import { RealEstateType } from "../../types/realEstate";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import api from "../../service/api";
import "./styles.css";
import Footer from "../../components/Footer";

const Home: React.FC = () => {
  const [realEstates, setRealEstates] = useState<RealEstateType[]>([]);

  const getRealEstates = async () => {
    try {
      const response = await api.get("realestates");
      console.log(response.data); // Adicione este log
      setRealEstates([...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    getRealEstates();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">
        <h1 className="text-center  shadow py-2" style={{ backgroundColor: "rgba(236, 215, 215, 0.507)" }}>
          Imóveis
        </h1>
        <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
          {realEstates.length === 0 ? (
            console.log("Sem dados disponíveis"),
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          ) : (
            realEstates
              .sort((a, b) => a.id - b.id)
              .map((realEstate) => (
                <div className="col" key={realEstate.id}>
                  <div className="card shadow-sm h-100">
                    <a href={`/realEstate/${realEstate.id}`}>
                      <img
                        src={realEstate.images[0]}
                        className="card-img-top border secondary"
                        alt={realEstate.description}
                      />
                    </a>
                    <div className="card-body border secondary">
                      <h5 className="card-title text-center">
                        {realEstate.description}
                      </h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {realEstate.type}
                        </small>
                      </p>
                      <p className="card-text">{realEstate.description}</p>
                      <div className="row pt-2">
                        <div className="col p-0">
                          <small>{realEstate.status ? "Concluído" : "Em andamento"}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
