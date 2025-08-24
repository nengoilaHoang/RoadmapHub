import { ResizableNode } from '#Helps/ResizableNode.jsx';
export default function CheckList({ data, id, selected }) {
  return (
    <ResizableNode
      data={data}
      id={id}
      selected={selected}
      border="2px solid #555"
      background="#fff"
      borderRadius="8px"
      name="checklist node"
    />
  );
}