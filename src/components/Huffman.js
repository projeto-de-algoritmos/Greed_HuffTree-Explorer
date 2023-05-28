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

  downloadImage = () => {
    const { compressedImage } = this.state;

    const downloadLink = document.createElement('a');
    downloadLink.href = `data:image/jpeg;base64,${compressedImage}`;
    downloadLink.download = 'compressed_image.jpg';

    downloadLink.click();
  };

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


    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = originalImage.width;
    canvas.height = originalImage.height;
    ctx.drawImage(originalImage, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const frequencies = {};

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

    const huffmanTree = buildHuffmanTree(frequencies);
    let compressedPixels = '';
    for (let i = 0; i < pixels.length; i += 4) {
      const red = pixels[i];
      const green = pixels[i + 1];
      const blue = pixels[i + 2];
      const pixelValue = `${red},${green},${blue}`;
      const huffmanCode = encodePixel(huffmanTree, pixelValue);
      compressedPixels += huffmanCode;
    }

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
            <button onClick={this.downloadImage}>Download Imagem Compactada</button>
            <img src={compressedImage.src} alt="Imagem Compactada" />
          </div>
        )}
      </div>
    );
  }
}

export default Huffman;

const buildHuffmanTree = (frequencies) => {
  const nodes = Object.entries(frequencies).map(([pixelValue, frequency]) => ({
    pixelValue,
    frequency,
    left: null,
    right: null,
  }));

  while (nodes.length > 1) {
    nodes.sort((a, b) => a.frequency - b.frequency);

    const leftChild = nodes.shift();
    const rightChild = nodes.shift();
    const parentNode = {
      pixelValue: null,
      frequency: leftChild.frequency + rightChild.frequency,
      left: leftChild,
      right: rightChild,
    };

    nodes.push(parentNode);
  }

  return nodes[0];
};

const encodePixel = (huffmanTree, pixelValue) => {
  const traverseTree = (node, code) => {
    if (!node.left && !node.right) {
      return code;
    }

    if (code.startsWith(0)) {
      return traverseTree(node.left, code.slice(1));
    }

    if (code.startsWith(1)) {
      return traverseTree(node.right, code.slice(1));
    }
  };
  return traverseTree(huffmanTree, pixelValue);
};
