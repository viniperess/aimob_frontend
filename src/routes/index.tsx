import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import CreateRealEstate from "../pages/CreateRealEstate";
import Profile from "../pages/Profile";
import RealEstate from "../pages/RealEstate";
import EditRealEstate from "../pages/EditRealEstate";
import CreateContract from "../pages/CreateContract";
import EditContract from "../pages/EditContract";
import Contracts from "../pages/Contracts";
import CreateAppointment from "../pages/CreateAppointment";
import Appointments from "../pages/Appointments";
import EditAppointment from "../pages/EditAppointment";
const RoutesApp: React.FC = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/create_realestate" element={<CreateRealEstate />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/realestate/:id" element={<RealEstate />} />
          <Route path="/edit_realEstate/:id" element={<EditRealEstate />} />
          <Route path="/create_contract" element={<CreateContract />} />
          <Route path="/edit_contract/:id" element={<EditContract />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="create_appointment" element={<CreateAppointment />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/edit_appointment/:id" element={<EditAppointment />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
