import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import AppointmentForm from './components/AppointmentForm';
import About from './pages/About';
import AdminSignup from './pages/AdminSignup';
import Footer from './components/Footer';
import UserAppointment from './pages/UserAppointment';
import AddDoctorForm from './pages/AddDoctorForm';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'|| location.pathname === '/adminsignup';

  return (
    <div className={isAuthPage ? 'auth-background' : ''}>
      
        <Navbar />
        <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='adminsignup' element={<AdminSignup/>} />
          <Route path='appointment' element={<AppointmentForm/>}/>
          <Route path='user-appointments' element={<UserAppointment/>}/>
          <Route path='admin-dashboard' element={<AdminDashboard/>}/>
          <Route path='add-doctor' element={<AddDoctorForm/>}/>
          <Route path='doctor-dashboard' element={<DoctorDashboard/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='*' element={<Nopage/>}/>
        </Routes>
        {!isAuthPage &&<Footer/>}
      
    </div>
  );
}

export default App;
