import React, { useCallback, useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  MiniMap,
  Background,
} from 'reactflow';

import CustomNode from './CustomNode';

import { nodes as initialNodes, edges as initialEdges } from './initialElements';
import useAnimatedNodes from './useAnimatedNodes';
import useExpandCollapse from './useExpandCollapse';

import 'reactflow/dist/style.css';
import styles from './styles.module.css';

const proOptions = { account: 'paid-pro', hideAttribution: true };

const nodeTypes = {
  custom: CustomNode,
};

function ReactFlowPro({ treeWidth = 220, treeHeight = 100, animationDuration = 300 } = {}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { nodes: visibleNodes, edges: visibleEdges } = useExpandCollapse(nodes, edges, { treeWidth, treeHeight });
  const { nodes: animatedNodes } = useAnimatedNodes(visibleNodes, { animationDuration });

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  const onNodeClick = useCallback(
    (_, node) => {
      setNodes((nds) =>
        nds.map((n) => {
          if (n.id === node.id) {
            return {
              ...n,
              data: { ...n.data, expanded: !n.data.expanded },
            };
          }

          return n;
        })
      );
    },
    [setNodes]
  );

  return (
    <ReactFlow
      fitView
      nodes={animatedNodes}
      edges={visibleEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      nodesDraggable={false}
      nodesConnectable={false}
      className={styles.viewport}
      zoomOnDoubleClick={false}
      elementsSelectable={false}
    >
      <Background />
      <MiniMap />
    </ReactFlow>
  );
}

function Flowchart(props) {
  return (
    <ReactFlowProvider>
      <ReactFlowPro {...props} />
    </ReactFlowProvider>
  );
}

export default Flowchart;
