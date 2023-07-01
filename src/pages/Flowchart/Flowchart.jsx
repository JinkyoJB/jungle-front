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

const proOptions = {
    account: 'paid-pro',
    hideAttribution: true,
  };


function Flowchart() {
    return (
        <div className="flowchart">
            
        </div>
    )
}
export default Flowchart;