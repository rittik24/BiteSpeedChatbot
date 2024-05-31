import React, { useState, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    Background,
    Controls,
    useNodesState,
    useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import TextNode from './TextNode';
import { AiTwotoneMessage, AiOutlineArrowLeft } from "react-icons/ai";

const initialNodes = [];
const initialEdges = [];

const nodeTypes = {
    textNode: TextNode,
};

const FlowBuilder = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [selectedNode, setSelectedNode] = useState(null);
    const [isMessageButtonVisible, setIsMessageButtonVisible] = useState(true);
    const [textareaValue, setTextareaValue] = useState('');

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    const onNodeClick = (event, node) => {
        setSelectedNode(node);
        setTextareaValue(node.data.label);
        setIsMessageButtonVisible(false);
    };

    const addTextNode = () => {
        const id = `${nodes.length + 1}`;
        const newNode = {
            id,
            type: 'textNode',
            data: { label: '' },
            position: { x: 250, y: 5 * nodes.length * 50 },
        };
        setNodes((nds) => nds.concat(newNode));
        setSelectedNode(newNode);
        setTextareaValue('');
        setIsMessageButtonVisible(false);
    };

    const onSave = () => {
        const nodesWithEmptyTargets = nodes.filter(node => {
            const isSource = edges.some(edge => edge.source === node.id);
            const isTarget = edges.some(edge => edge.target === node.id);
            return !isTarget && isSource;
        });

        if (nodesWithEmptyTargets.length > 1) {
            alert('More than one node has empty target handles.');
            return;
        }

        const textNodes = nodes.filter(node => node.type === 'textNode');
        const connectedTextNodes = textNodes.every(node =>
            edges.some(edge => edge.source === node.id || edge.target === node.id)
        );

        if (!connectedTextNodes) {
            alert('Cannot Save Flow');
            return;
        }
        // console.log('Saved Flow:', { nodes, edges });
        alert('Flow Saved');

        setSelectedNode(null);
        setIsMessageButtonVisible(true);
    };

    const onBackClick = () => {
        setSelectedNode(null);
        setIsMessageButtonVisible(true);
    };

    const handleTextareaChange = (e) => {
        const newValue = e.target.value;
        setTextareaValue(newValue);
        setNodes((nds) =>
            nds.map((node) =>
                node.id === selectedNode.id ? { ...node, data: { ...node.data, label: newValue } } : node
            )
        );
    };

    return (
        <ReactFlowProvider>
            <div style={{ width: "100%", backgroundColor: "#e9e6f0", display: "flex", justifyContent: "flex-end", paddingRight: "10px" }}>
                <button
                    onClick={onSave}
                    style={{ marginBottom: '10px', padding: '10px', background: 'white', color: 'blue', border: '1px solid blue', borderRadius: '5px', cursor: 'pointer', marginRight: "100px" }}
                >
                    Save Changes
                </button>
            </div>
            <div style={{ height: '90vh', display: 'flex' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeClick={onNodeClick}
                        nodeTypes={nodeTypes}
                        fitView
                    >
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>
                <div style={{ width: '25%', borderLeft: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
                    {isMessageButtonVisible && (
                        <button
                            onClick={addTextNode}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "30%",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: '10px',
                                padding: '10px',
                                background: 'white',
                                color: 'blue',
                                border: '1px solid blue',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                gap: "10px",
                            }}
                        >
                            <AiTwotoneMessage style={{ width: "40px", height: "32px" }} />
                            Message
                        </button>
                    )}
                    {selectedNode && (
                        <div style={{ flex: 1 }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "20px",
                                cursor: "pointer",
                                borderBottom: "1px solid blue",
                                paddingLeft: "10px",
                                marginBottom: "20px"
                            }}
                                onClick={onBackClick}
                            >
                                <AiOutlineArrowLeft />
                                <h3 style={{ fontSize: "14px", color: "blue", textAlign: "center", fontWeight: "bold" }}>Message</h3>
                            </div>
                            <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
                                <label style={{ color: "blue", marginBottom: "10px" }}>Text</label>
                                <textarea
                                    value={textareaValue}
                                    onChange={handleTextareaChange}
                                    style={{ width: '100%', height: '100px', border: "1px solid blue" }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ReactFlowProvider>
    );
};

export default FlowBuilder;
