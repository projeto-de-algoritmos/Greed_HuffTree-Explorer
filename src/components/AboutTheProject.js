import React from 'react';
import './styles/AboutTheProject.css';
import Header from './Header';

function AboutTheProject() {
    return (
        <>
            <Header />
            <div className="about-the-project">
                <h2>Sobre o projeto</h2>
                <p>Utilizando as frequéncias das palavras, constrói-se uma
                    árvore de Huffman. O algoritmo de Huffman atribui
                    códigos binários mais curtos para as palavras mais
                    frequentes e códigos mais longos para as menos
                    frequentes, maximizando a eficiéncia da codificação.</p>
            </div>
        </>
    );
}

export default AboutTheProject;