import React from 'react';
import { useDnD } from './DnDContext';
// node preview
import LabelNode from '#pages/Roadmap/Nodes/Label/Label.jsx';
import Topic from '#pages/Roadmap/Nodes/Topic/Topic.jsx';

const NodesBar = () => {
  const [, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType); // lưu type vào context
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('application/reactflow', nodeType); 
  };

  return (
    <aside style={{ width: 200, padding: 10, borderRight: '1px solid #ccc' }}>
      <p className="description">Drag these nodes into the canvas:</p>
      <div
        className="dndnode"
        draggable
        onDragStart={(event) => onDragStart(event, 'label')}
        style={{ marginBottom: 10, cursor: 'grab' }}
      >
        <LabelNode />
      </div>
      <div
        className="dndnode"
        draggable
        onDragStart={(event) => onDragStart(event, 'topic')}
        style={{ marginBottom: 10, cursor: 'grab' }}
      >
        <Topic />
      </div>
    </aside>
  );
};

export default NodesBar;
