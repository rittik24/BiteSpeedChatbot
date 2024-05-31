import React from 'react';
import { Handle, Position } from 'reactflow';
import { AiOutlineMessage } from 'react-icons/ai';

const TextNode = ({ data }) => {
    console.log("data", data)
    return (
        <div style={{
            paddingBottom: '15px',
            borderRadius: '5px',
            background: '#ffffff',
            width: '200px',
            textAlign: 'center',
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            border: "1px solid skyblue"
        }}>
            <Handle type="target"
                position={Position.Left}
                style={{ background: 'skyblue' }}
                isConnectableEnd="true"
            />
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "left",
                fontWeight: 'bold',
                backgroundColor: '#e3f2fd',
                fontSize: '8px',
                padding: '5px 5px',
                borderBottom: '1px solid #ddd',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                textAlign: "left",
                gap: "10px"
            }}>
                <AiOutlineMessage style={{ width: "14px", height: "14px" }} />
                <span style={{ verticalAlign: 'middle' }}>Send Message</span>
            </div>
            <div style={{ fontSize: '10px', textAlign: "left", paddingLeft: "5px", paddingTop: "5px" }}>{data.label}</div>
            <Handle type="source" position={Position.Right} style={{ background: 'skyblue' }} isConnectableStart="true" />
        </div>
    );
};

export default TextNode;
