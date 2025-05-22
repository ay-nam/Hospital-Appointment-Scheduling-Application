import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import '../styles/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                alert('Login successful!');
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Welcome Back</h1>
                <p>Sign in to continue to MediCare</p>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className='login-input1'>
                        <label htmlFor='email'><FaEnvelope /></label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            placeholder='Enter your email'
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='login-input1'>
                        <label htmlFor='password'><FaLock /></label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={formData.password}
                            placeholder='Enter your password'
                            onChange={handleChange}
                            required
                        />
                        <span onClick={togglePassword}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <div className='login-input2'>
                        <input type='checkbox' id='remember-me' name='remember-me' />
                        <label htmlFor='remember-me'>Remember me</label>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                </form>

                <p>Don't have an account?
                    <Link to="/signup"> Register</Link>
                </p>
            </div>
        </div>
    );
}
