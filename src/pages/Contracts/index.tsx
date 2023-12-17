import React, { useEffect, useState } from 'react';
import { Contract } from '../../types/contract';
import api from '../../service/api';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';



const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>();

  const getContracts = async () => {
    try {
      const response = await api.get("contracts");
      console.log(response.data);
      setContracts([...response.data]);
      
    } catch (error) {
      console.log(error);
    }
  }
    
  useEffect(() => {
    getContracts();
  }, []);

  return (
    <>
      <Navbar />

      <div className="page-container">

        <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
          {contracts?.length === 0 ? (
            console.log("Sem dados disponíveis"),
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          ) : (
            contracts?.sort((a, b) => a.id - b.id)
              .map((contract) => (
              <a href={`/edit_contract/${contract.id}`}>
                <div className="col" key={contract.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body border secondary">
                      <h5 className="card-title text-center">
                        {contract.finalValue}
                      </h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {contract.contractType}
                        </small>
                      </p>
                      <p className="card-text">{contract.estateId}</p>
                      <div className="row pt-2">
                        <div className="col p-0">
                          <small>{contract.commission}</small>
                        </div>
                        <div className="col p-0">
                          <small>{contract.clientUserId}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </a>
              ))
          )}
        </div>

        
      </div>
      <Footer />
    </>
  )
}

export default Contracts;