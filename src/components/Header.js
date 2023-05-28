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
                    <div onClick={() => navigate('/Greed_HuffTree-Explorer')}>Pagina Inicial</div>
                    <div onClick={() => navigate('/Greed_HuffTree-Explorer/about-us')}>Sobre Nós</div>
                    <div onClick={() => navigate('/Greed_HuffTree-Explorer/about-the-project')}>Sobre o Projeto</div>
                </div>
            </nav>
        </header>
    );
}