import { Line } from '#components/Roadmap/Nodes/Node/Line.jsx';
export default function HozicontalLine({ data, id, selected,type }) {
  return (
    <Line
      data={data}
      id={id}
      selected={selected}
      type={type}
    />
  );
}
