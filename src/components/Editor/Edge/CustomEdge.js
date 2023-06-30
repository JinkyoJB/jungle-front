import React from 'react';
import { BaseEdge, getBezierPath } from 'reactflow';


export default function CustomEdge(props) {
  const { 
    id, 
    sourceX, 
    sourceY, 
    targetX, 
    targetY, 
    sourcePosition, 
    targetPosition, 
    type = 'smoothstep',
    style = {stroke : 'black', strokeWidth : 3}, 
    markerEnd = 'Arrow',
  } = props;

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    type
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style}  />
    </>
  );
}
