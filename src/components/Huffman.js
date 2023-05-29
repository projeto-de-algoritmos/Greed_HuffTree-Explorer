import React, { useState } from 'react';
import InputForm from './InputForm';
import HuffmanTree from './HuffmanTree';
import HuffmanCodes from './HuffmanCodes';
import './styles/Huffman.css'

const Huffman = () => {
  const [tree, setTree] = useState(null);
  const [codes, setCodes] = useState(null);

  const handleFormSubmit = (input) => {
    const frequencyMap = {};
    for (const char of input) {
      frequencyMap[char] = frequencyMap[char] ? frequencyMap[char] + 1 : 1;
    }
    const tree = buildHuffmanTree(frequencyMap);
    setTree(tree);
    const codes = buildHuffmanCodes(tree);
    setCodes(codes);
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
    return nodes[0];
  };

  const buildHuffmanCodes = (tree) => {
    const codes = {};
    const traverse = (node, code = '') => {
      if (node.char) {
        codes[node.char] = code;
      } else {
        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
      }
    };
    traverse(tree);
    return codes;
  };

  return (
    <div className='Huffman'>
      <InputForm onFormSubmit={handleFormSubmit} />
      {tree && <HuffmanTree tree={tree} />}
      {codes && <HuffmanCodes codes={codes} />}
    </div>
  );
};

export default Huffman;