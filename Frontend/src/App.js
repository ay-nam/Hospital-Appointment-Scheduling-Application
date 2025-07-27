import React, { useState, useEffect } from 'react';
import { BrowserRouter as  Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

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
import DoctorProfile from './components/DoctorProfile';
import ChatbotUI from './components/ChatbotUI';

// Spinner component
const Spinner = () => (
  <div style={{ textAlign: 'center', marginTop: '100px', fontSize: '1.2rem' }}>
    Loading...
  </div>
);

// Protected route component
// const ProtectedRoute = ({ user, loading, children, requiredRole }) => {
//   if (loading) return <Spinner />;
//   if (!user) return <Navigate to="/login" />;
//   if (requiredRole && user.role !== requiredRole) return <Navigate to="/" />;
//   return children;
// };

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/adminsignup';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user info when app loads
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/me', { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className={isAuthPage ? 'auth-background' : ''}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='adminsignup' element={<AdminSignup />} />

        <Route path='appointment' element={<AppointmentForm />} />
        <Route path='user-appointments' element={<UserAppointment />} />
        <Route path='/admin-dashboard' element={<AdminDashboard /> } />
        <Route path='add-doctor' element={<AddDoctorForm />} />
        <Route path="/admin/doctor/:id" element={<DoctorProfile />} />
        <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Nopage />} />
      </Routes>
      <ChatbotUI />
      {!isAuthPage && <Footer />}
    </div>
  );
}

export default App;
