import React, { useState } from 'react';
import './styles/Huffman.css';

const HuffmanNode = ({ node }) => {
  if (!node) {
    return null;
  }

  const { char, frequency, left, right } = node;

  return (
    <div className="huffman-node">
      <div className="huffman-branches">
        <div className="huffman-branch huffman-branch-left" />
        <div className="huffman-branch huffman-branch-right" />
      </div>
      <div className="huffman-content">
        <span className="huffman-char">{char}</span>
        <span className="huffman-frequency">({frequency})</span>
      </div>
      <div className="huffman-children">
        <HuffmanNode node={left} />
        <HuffmanNode node={right} />
      </div>
    </div>
  );
};

const HuffmanTree = ({ tree }) => {
  return (
    <div className="huffman-tree">
      <h2>Árvore de Huffman</h2>
      <div className="huffman-root">
        <HuffmanNode node={tree} />
      </div>
    </div>
  );
};

const Huffman = () => {
  const [input, setInput] = useState('');
  const [tree, setTree] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.length === 0) {
      alert('Digite uma frase!');
      return;
    }
    const frequencyMap = {};
    for (const char of input) {
      frequencyMap[char] = frequencyMap[char] ? frequencyMap[char] + 1 : 1;
    }
    const tree = buildHuffmanTree(frequencyMap);
    setTree(tree);
  };

  const buildHuffmanTree = (frequencyMap) => {
    const nodes = [];
    for (const char in frequencyMap) {
      nodes.push({ char, frequency: frequencyMap[char], left: null, right: null });
    }

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);
      const left = nodes.shift();
      const right = nodes.shift();
      const parent = {
        char: '',
        frequency: left.frequency + right.frequency,
        left,
        right,
      };
      nodes.push(parent);
    }

    return nodes[0]; // A raiz da árvore é o último nó restante no array
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Frase:
          <input type="text" value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Exibir Árvore de Huffman</button>
      </form>
      {tree && <HuffmanTree tree={tree} />}
    </div>
  );
};

export default Huffman;
