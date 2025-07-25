import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import '../styles/Navbar.css';

export default function Navbar() {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
            setUser(null);
            navigate('/');
        } catch (error) {
            console.error('Logout failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <nav>
            <div className='nav-content'>
                <img src='health_plus.png' alt='health-plus icon' />
                <h1>
                    <span style={{ color: '#373468' }}>Medi</span>
                    <span style={{ color: '#3dc4d8' }}>Care</span>
                </h1>
            </div>

            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/appointment'>Appointment</Link></li>
                <li><Link to='/about'>About Us</Link></li>
            </ul>

            <div className='navbar-dropdown'>
                <div className='navbar-dropdown-heading'>
                    <p>{user ? user.name : 'Guest user'}</p>
                    <div className="navbar-dropdown-arrow">&#9662;</div>
                </div>

                <div className='navbar-dropdown-content'>
                    {!user ? (
                        <Link to='/login' className="dropdown-item">Login</Link>
                    ) : (
                        <>
                            {user.role === 'user' && (
                                <Link to='/user-appointments' className="dropdown-item">My Appointments</Link>
                            )}
                            <button onClick={handleLogout} className="dropdown-item">Logout</button>
                        </>
                    )}
                </div>



            </div>
        </nav>
    );
}
