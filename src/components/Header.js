import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons8-image-96.png'
import './styles/Header.css'

export default function Header() {
    let navigate = useNavigate();
    return (
        <header>
            <nav>
                <div className="logo-container" onClick={() => navigate('/')}>
                    <img src={logo} alt="site-logo" />
                </div>
                <div className="nav-links">
                    <div onClick={() => navigate('/')}>Pagina Inicial</div>
                    <div onClick={() => navigate('/about-us')}>Sobre Nós</div>
                    <div onClick={() => navigate('/about-the-project')}>Sobre o Projeto</div>
                </div>
            </nav>
        </header>
    );
}