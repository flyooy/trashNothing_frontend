import { Link, Outlet, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './Header.css';
export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); 
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    return (
        <div className="header-container">
            <Link to="/" className="logo">nothingtotrash</Link>
            <div className="nav-container">
                <Link to="/marktplatz">Marktplatz</Link>
                <Link to="/aboutus">Über uns</Link>
            </div>
            <div className="right-container">
                {!token ? (
                    <>
                        <Link to="/login">
                            <button>Log in</button>
                        </Link>
                        <Link to="/registration">
                            <button className='register_button'>Registriere Dich</button>
                        </Link>
                    </>
                ) : (
                    <div 
                        className="account-dropdown" 
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                        <button className="account-button">
                            Mein Konto
                        </button>
                        {isDropdownOpen && (
                                <div className="dropdown-menu">
                                <Link to="/createproduct">Produkt einstellen</Link>
                                <Link to="/wischlist">Wunschliste</Link>
                                <Link to="/gekauflist">Gekaufte Produkte</Link>
                                {/* <Link to="/soldproduct">Verkaufte Produkte</Link> */}
                                <button onClick={handleLogout} className="logout-button">Abmelden</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}