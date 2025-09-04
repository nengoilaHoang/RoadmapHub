import { Line } from '#components/Roadmap/Nodes/Node/Line.jsx';
export default function VerticalLine({ data, id, selected,type }) {
  return (
    <Line
      data={data}
      id={id}
      selected={selected}
      type={type}
    />
  );
}