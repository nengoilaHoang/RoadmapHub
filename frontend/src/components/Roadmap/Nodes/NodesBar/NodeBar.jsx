import React from 'react';
import { useDnD } from './DnDContext';
import './NodeBar.css';

const NodesBar = () => {
  const [, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', nodeType);
  };

  const nodeTypes = [
    { type: 'title', label: 'Title' },
    { type: 'topic', label: 'Topic' },
    { type: 'button', label: 'Button' },
    { type: 'paragraph', label: 'Paragraph'},
    { type: 'section', label: 'Section' },
    { type: 'checklist', label: 'Check List' },
    { type: 'horizontalline', label: 'Horizontal Line' },
    { type: 'verticalline', label: 'Vertical Line' }
  ];

  return (
    <aside className="nodes-bar">
      <div className="nodes-bar-header">
        <h3>Node Types</h3>
        <p className="description">Drag nodes to canvas</p>
      </div>
      <div className="nodes-container">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="node-item"
            draggable
            onDragStart={(event) => onDragStart(event, node.type)}
          >
            {node.label}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default NodesBar;