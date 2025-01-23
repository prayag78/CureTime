import React,{useContext} from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import UserLogin from "./pages/UserLogin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navber from "./components/Navber";
import Cright from "./components/Cright";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from "./pages/Login";
import PanelNavber from "./components/PanelNavber";
import PanelSidebar from "./components/PanelSidebar";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorAppointments from "./pages/Doctor/DoctorAppointments"; 
import DoctorProfile from "./pages/Doctor/DoctorProfile";
import { AppContext } from "./context/AppContext";

const App = () => {
  const {dToken} = useContext(DoctorContext)

  return  dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <PanelNavber />
      <div className="flex items-start">
        <PanelSidebar />
        <Routes>
        
        {/* Doctor Routes */}
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor-appointments" element={<DoctorAppointments />} />
        <Route path="/doctor-profile" element={<DoctorProfile />} />

        </Routes>
      </div>
    </div>
  ) : (
    <div className=" mx-4 md:mx-10 lg:mx-20">
    <ToastContainer/>
      <Navber />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

        <Route path="/doc-login" element={<Login/>} />
        
      </Routes>
      <Cright/>
    </div>
  ) 
};

export default App;
