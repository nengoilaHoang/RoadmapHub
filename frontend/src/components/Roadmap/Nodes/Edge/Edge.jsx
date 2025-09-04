import { BaseEdge, getBezierPath } from '@xyflow/react';
export default function Edge({ id, sourceX, sourceY, targetX, targetY, markerEnd,markerStart,style}){
    const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} markerStart={markerStart}style={style||{ stroke: '#1e90ff', strokeWidth: 2 ,strokeDasharray:"solid" }} />
    </>
  );

}