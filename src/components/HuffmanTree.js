import React from 'react';
import { Tree } from 'react-d3-tree';
import './styles/HuffmanTree.css';

const HuffmanTree = ({ tree }) => {
    const convertTreeData = (node) => {
        if (!node) {
            return null;
        }

        return {
            name: `${node.char} (${node.frequency})`,
            children: [
                convertTreeData(node.left),
                convertTreeData(node.right),
            ].filter(Boolean),
        };
    };

    const treeData = convertTreeData(tree);

    return (
        <>
            <p>Sinta-se à vontade para visualizar a árvore</p>
            <div className="HuffmanTree">
                <div className="HuffmanTree__svgContainer">
                    <Tree
                        data={treeData}
                        orientation="vertical"
                        translate={{ x: 0, y: 0 }}
                        separation={{ siblings: 0.5, nonSiblings: 0.5 }}
                        nodeSize={{ x: 150, y: 100 }}
                    />
                </div>
            </div>
            <p>Experimente arrastar para os lados, aumentar ou diminuir a árvore!</p>
        </>
    );
};

export default HuffmanTree;
