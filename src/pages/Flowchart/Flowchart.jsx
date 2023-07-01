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



function ReactFlowPro({ direction = 'TB' }) {
    const { fitView } = useReactFlow();
    
    // 🔥 추가 해야 함
    // useAutoLayout({ direction });
    
    const [nodes, setNodes] = useState(initialElements.nodes);
    const [edges, setEdges] = useState(initialElements.edges);

    const createConnection = (sourceId) => {
        // create an incremental ID based on the number of elements already in the graph
        const targetId = `${nodes.length + 1}`;
    
        const targetNode = {
          id: targetId,
          data: { label: `Node ${targetId}` },
          position: { x: 0, y: 0 }, // no need to pass a position as it is computed by the layout hook
          type: 'custom',
          style: { opacity: 0 },
        };
        const connectingEdge = {
            id: `${sourceId}->${targetId}`,
            source: sourceId,
            target: targetId,
            style: { opacity: 0 },
          };
        
        setNodes((nodes) => nodes.concat([targetNode]));
        setEdges((edges) => edges.concat([connectingEdge]));
    
        }


        const onDrop = (evt) => {
            // make sure that the event target is a DOM element
            if (evt.target instanceof Element) {
              // from the target element search for the node wrapper element which has the node id as attribute
              const targetId = evt.target.closest('.react-flow__node')?.getAttribute('data-id');
        
              if (targetId) {
                // now we can create a connection to the drop target node
                createConnection(targetId);
              }
            }
          };
        
        const onNodeClick = (event, node) => {
        // on click, we want to add create a new node connection the clicked node
            createConnection(node.id);
        };

        const onNodesChange = (changes) => {
            setNodes((nodes) => applyNodeChanges(changes, nodes));
        };
        const onEdgesChange = (changes) => {
            setEdges((edges) => applyEdgeChanges(changes, edges));
        };

        useEffect(() => {
            fitView({ duration: 400 });
        }, [nodes, fitView]);
        


        return (
            <div >
                <ReactFlow
                    proOptions={proOptions}
                    nodeTypes={nodeTypes}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    fitView
                    onDrop={onDrop}
                    onNodeClick={onNodeClick}
                    defaultEdgeOptions={defaultEdgeOptions}
                    minZoom={-Infinity}
                    maxZoom={Infinity}
                    />
            </div>
        ); 
}

const Flowchart = (props) => {
    return (
      <ReactFlowProvider>
        <ReactFlowPro {...props} />
      </ReactFlowProvider>
    );
  };
  
  export default Flowchart;