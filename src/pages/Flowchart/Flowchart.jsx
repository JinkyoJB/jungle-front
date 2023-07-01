import React, { useEffect, useState, MouseEvent, DragEvent, DragEventHandler } from 'react';
import ReactFlow, {
  MarkerType,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  NodeTypes,
  OnNodesChange,
  applyNodeChanges,
  NodeMouseHandler,
  NodeChange,
  OnEdgesChange,
  EdgeChange,
  applyEdgeChanges,
} from 'reactflow';

import CustomNode from './CustomNode';
import * as initialElements from './initialElements';
import 'reactflow/dist/style.css';
import styles from './styles.module.css';

// 노드 타입
const nodeTypes = {
    custom: CustomNode
}

// 프로 옵션
const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
  };

// 디폴트 엣지 세팅
const defaultEdgeOptions = {
type: 'smoothstep',
markerEnd: { type: MarkerType.ArrowClosed },
pathOptions: { offset: 5 },
};



function Flowchart({ direction = 'TB' }) {
    const { fitView } = useReactFlow();
    
    // 🔥 추가 해야 함
    // useAutoLayout({ direction });
    
    const [nodes, setNodes] = useState(initialElements.nodes);
    const [edges, setEdges] = useState(initialElements.edges);



    return (
        <div className="flowchart">
            
        </div>
    )
}
export default Flowchart;