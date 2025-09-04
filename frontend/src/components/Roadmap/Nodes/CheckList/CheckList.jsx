import { ResizableNode } from '#components/Roadmap/Nodes/Node/ResizableNode.jsx';
export default function CheckList({ data, id, selected,type }) {
  return (
    <ResizableNode
      type={type}
      data={data}
      id={id}
      selected={selected}
    />
  );
}