import React, { useState } from 'react';
import './styles/InputForm.css'

const InputForm = ({ onFormSubmit }) => {
    const [input, setInput] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.length === 0) {
            alert('Digite uma frase!');
            return;
        }
        onFormSubmit(input);
    };

    return (
        <form className='InputForm' onSubmit={handleSubmit}>
            <label>
                Entre com uma frase:
                <input type="text" value={input} onChange={handleInputChange} />
            </label>
            <button type="submit">Exibir Árvore de Huffman</button>
        </form>
    );
};

export default InputForm;