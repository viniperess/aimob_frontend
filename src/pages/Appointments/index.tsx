import React, { useEffect, useState } from 'react';
import { Appointment } from '../../types/appointment';
import api from '../../service/api';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Loading from '../../components/Loading';

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>();

  const getAppointments = async () => {
    try {
      const response = await api.get("appointments");
      console.log(response.data);
      setAppointments([...response.data]);
      
    } catch (error) {
      console.error("Get Appointment, Erro ao buscar dados.", error);
      
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <>
        <Navbar/>
        <div className="page-container">
        <div className="main-content container row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mx-auto my-auto">
          {appointments?.length === 0 ? (
            console.log("Sem dados disponíveis"),
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => <Loading key={n} />)
          ) : (
            appointments?.sort((a, b) => a.id - b.id)
              .map((appointment) => (
              <a href={`/edit_appointment/${appointment.id}`}>
                <div className="col" key={appointment.id}>
                  <div className="card shadow-sm h-100">
                    <div className="card-body border secondary">
                      <h5 className="card-title text-center">
                        {appointment.visitDate}
                      </h5>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {appointment.visitApproved}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-body-secondary">
                          {appointment.observation}
                        </small>
                      </p>
                      <p className="card-text">{appointment.estateId}</p>
                      <div className="row pt-2">
                      </div>
                    </div>
                  </div>
                </div>
                </a>
              ))
          )}
        </div>

        
      </div>
        <Footer/>
    </>
  )
}

export default Appointments;