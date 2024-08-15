import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import RealEstate from "../pages/RealEstate";
import CreateContact from "../pages/CreateContact";
import CreateAppointment from "../pages/CreateAppointment";
import Appointments from "../pages/Appointments";
import EditAppointment from "../pages/EditAppointment";
import MasterForm from "../components/RealEstate/MasterForm";
import CreateTask from "../pages/Tasks/CreateTask";
import TaskTable from "../pages/Tasks/Task";
import RealEstateContact from "../pages/RealEstateContact/RealEstates";
import RealEstateByContact from "../pages/RealEstateContact/RealEstatesById";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "./ProtectedRoute";

const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Fragment>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/realestatescontact" element={<RealEstateContact />} />
          <Route path="/realEstateByContact/:id" element={<RealEstateByContact />} />

          {/* Rotas protegidas */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/realestate/:id"
            element={
              <ProtectedRoute>
                <RealEstate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit_realestate/:id"
            element={
              <ProtectedRoute>
                <MasterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create_contact"
            element={
              <ProtectedRoute>
                <CreateContact />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create_appointment"
            element={
              <ProtectedRoute>
                <CreateAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit_appointment/:id"
            element={
              <ProtectedRoute>
                <EditAppointment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create_realestate"
            element={
              <ProtectedRoute>
                <MasterForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create_task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskTable />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
