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

    const renderCustomNodeElement = ({ nodeDatum }) => {
        return (
            <g>
                <circle r={10} fill="#222222" />
                <text x={-15} y={20} fontSize={12} fill='#222222'>
                    {nodeDatum.name}
                </text>
            </g>
        );
    };

    return (
        <>
            <p>Sinta-se à vontade para visualizar a árvore</p>
            <div className="HuffmanTree">
                <Tree
                    data={treeData}
                    orientation="vertical"
                    translate={{ x: 0, y: 0 }}
                    separation={{ siblings: 0.5, nonSiblings: 0.5 }}
                    nodeSize={{ x: 150, y: 100 }}
                    nodeSvgShape={{ shape: 'circle', shapeProps: { r: 10, fill: '#222222' } }}
                    renderCustomNodeElement={renderCustomNodeElement}
                />
            </div>
            <p>Experimente arrastar para os lados, aproximar ou afastar a árvore!</p>
        </>
    );
};

export default HuffmanTree;
