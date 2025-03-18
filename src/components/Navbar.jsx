import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

export default function Navbar() {

    return (
        <div>
            <nav>
                <div className='nav-content'>
                    <img src='health_plus.png' alt='health-plus icon' />
                    <h1>
                        <span style={{ color: '#373468' }}>Medi</span>
                        <span style={{ color: '#3dc4d8' }}>Care</span></h1>
                </div>

                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/appointment'>Appointment</Link></li>
                    <li><Link to='/about'>About Us</Link></li>
                </ul>

                <div className='navbar-dropdown'>
                    <div className='navbar-dropdown-heading'>
                        <p>Guest user</p>
                        <div className="navbar-dropdown-arrow">&#9662;</div>
                    </div>

                    <div className='navbar-dropdown-content'>
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}
