import React from 'react';
import './styles/Huffman.css';

class Huffman extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originalImage: null,
      compressedImage: null,
      huffmanTree: null,
    };
  }

  handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;
      image.onload = () => {
        this.setState({ originalImage: image });
      };
    };
    reader.readAsDataURL(file);
  };

  compressImage = () => {
    const { originalImage } = this.state;

    // Crie um elemento canvas para desenhar a imagem
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0);

    // Obtenha os dados dos pixels da imagem
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Crie um objeto para armazenar as frequências dos valores dos pixels
    const frequencies = {};

    // Calcule as frequências dos valores dos pixels
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const pixelValue = `${red},${green},${blue}`;
      if (frequencies[pixelValue]) {
        frequencies[pixelValue]++;
      } else {
        frequencies[pixelValue] = 1;
      }
    }

    // Construa a árvore de Huffman a partir das frequências dos pixels
    const huffmanTree = buildHuffmanTree(frequencies);

    // Codifique os pixels da imagem usando a árvore de Huffman
    let compressedPixels = '';
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const pixelValue = `${red},${green},${blue}`;
      const huffmanCode = encodePixel(huffmanTree, pixelValue);
      compressedPixels += huffmanCode;
    }

    // Atualize o estado do componente com a imagem compactada e a árvore de Huffman
    this.setState({
      compressedImage: compressedPixels,
      huffmanTree: huffmanTree,
    });
  };


  render() {
    const { originalImage, compressedImage } = this.state;

    return (
      <div className='Huffman'>
        <h2>Como usar:</h2>
        <p>1. Selecione um arquivo de imagem para upload.</p>
        <p>2. Clique no botão "Compactar Imagem" para iniciar o processo de compressão.</p>
        <p>3. A imagem original e a imagem compactada serão exibidas abaixo, se o processo for concluído com sucesso.</p>

        <input type="file" className="huffman-input-file" onChange={this.handleImageUpload} />
        <button onClick={this.compressImage}>Compactar Imagem</button>

        {originalImage && (
          <div>
            <h2>Imagem Original</h2>
            <img src={originalImage.src} alt="Imagem Original" />
          </div>
        )}

        {compressedImage && (
          <div>
            <h2>Imagem Compactada</h2>
            <img src={compressedImage.src} alt="Imagem Compactada" />
          </div>
        )}
      </div>
    );
  }
}

export default Huffman;

const buildHuffmanTree = (frequencies) => {
  // Crie nós iniciais com base nas frequências dos pixels
  const nodes = Object.entries(frequencies).map(([pixelValue, frequency]) => ({
    pixelValue,
    frequency,
    left: null,
    right: null,
  }));

  // Construa a árvore de Huffman
  while (nodes.length > 1) {
    // Ordene os nós com base em suas frequências (do menor para o maior)
    nodes.sort((a, b) => a.frequency - b.frequency);

    // Crie um novo nó pai para os dois nós de menor frequência
    const leftChild = nodes.shift();
    const rightChild = nodes.shift();
    const parentNode = {
      pixelValue: null,
      frequency: leftChild.frequency + rightChild.frequency,
      left: leftChild,
      right: rightChild,
    };

    // Insira o novo nó na lista de nós
    nodes.push(parentNode);
  }

  // O último nó restante é a raiz da árvore de Huffman
  return nodes[0];
};

const encodePixel = (huffmanTree, pixelValue) => {
  // Percorra a árvore de Huffman até encontrar o nó correspondente ao pixel
  const traverseTree = (node, code) => {
    // Caso base: se o nó for uma folha (pixel)
    if (!node.left && !node.right) {
      // Retorne o código acumulado até o momento
      return code;
    }

    // Se o pixel estiver à esquerda, adicione '0' ao código e continue percorrendo
    if (code.startsWith(0)) {
      return traverseTree(node.left, code.slice(1));
    }

    // Se o pixel estiver à direita, adicione '1' ao código e continue percorrendo
    if (code.startsWith(1)) {
      return traverseTree(node.right, code.slice(1));
    }
  };

  // Inicie a travessia da árvore de Huffman a partir da raiz
  return traverseTree(huffmanTree, pixelValue);
};
