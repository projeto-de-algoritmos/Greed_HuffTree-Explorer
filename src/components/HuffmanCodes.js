import React from 'react';
import './styles/HuffmanCodes.css'

const HuffmanCodes = ({ codes }) => {
    return (
        <div className="HuffmanCodes">
            <h2>Códigos Huffman</h2>
            <ul>
                {Object.keys(codes).map((char) => (
                    <li key={char}>
                        {char}: <code>{codes[char]}</code>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HuffmanCodes;