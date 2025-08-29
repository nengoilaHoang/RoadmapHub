import { Handle } from '@xyflow/react';
import { ResizableNode } from '#Helps/ResizableNode.jsx';
import './Topic.css';
export default function Topic({ data, id,  selected }) {
  return (
    <ResizableNode data={data} id={id} selected = {selected} />
   
  );
}
