
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Nopage from './pages/Nopage';
import AppointmentForm from './components/AppointmentForm';
import About from './pages/About';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/'  element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='appointment' element={<AppointmentForm/>}/>
          <Route path='about' element={<About/>}/>
          <Route path='*' element={<Nopage/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
