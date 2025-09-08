import { Handle } from '@xyflow/react';
import { ResizableNode } from '#components/Roadmap/Nodes/Node/ResizableNode.jsx';
import './Topic.css';
import { useEffect } from 'react';
export default function Topic({ data, id,  selected ,type}) {
  return (
    <ResizableNode data={data} id={id} selected = {selected} type={type} />
  );
}
