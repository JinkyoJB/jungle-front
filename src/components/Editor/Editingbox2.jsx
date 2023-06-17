// import style sheets
import 'reactflow/dist/style.css';
import './text-updater-node.css';
import './index.css';
// import Node Types
import TextUpdaterNode from './TextUpdaterNode.js';
import PictureNode from './PictureNode.js';
import PictureNode2 from './PictureNode2.js';
import PictureNode3 from './PictureNode3.js';

// import Component
import Modal from './Modal';

// import React 
import React, { useEffect, useState, useRef , useCallback } from 'react';
import Picturebar from './Picturebar';


// import React Flow 
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Panel,
  Controls,
  MiniMap,
  NodeToolbar,
} from 'reactflow';

// import axios connection
import axios from "axios";

// import zustand
import {create} from 'zustand';

// define the store
export const useStore = create(set => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));

//🐬 웹 알티시 테스팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const flowKey = 'example-flow';
const nodeTypes = {textUpdater: TextUpdaterNode, 
                  pix: PictureNode,
                  pix2: PictureNode2,
                  pix3: PictureNode3
                }

  const initialNodes = [
  { id: '1', 
//   type: 'textUpdater',
   data: { label: '공사 초기 현장' }, 
   position: { x: -42, y: 59 } },
  
   { id: '2', 
//   type: 'textUpdater', 
  data: { label: '공사 중기 현장' }, 
  position: { x: 75, y: 286 } 
  },
  { id: '3', 
  //   type: 'textUpdater', 
    data: { label: '공사 말기 현장' }, 
    position: { x: 6, y: 570 } 
    },

  {
    id: '4',
    type: 'pix', 
    data: { label: 'picture node1'}, 
    position: {x: 164, y: -87}
  }
  ,
  {
    id: '5',
    type: 'pix2', 
    data: { label: 'picture node2'}, 
    position: {x: 243, y: 178}
  }
  ,
  {
    id: '6',
    type: 'pix3', 
    data: { label: 'picture node3'}, 
    position: {x: 195, y: 457}
  }
];


let id = 100;
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };
const initialEdges = 
[
  { id: 'e1-2', source: '1', target: '2' }, 
  { id: 'e1-2', source: '2', target: '3' }, 
];

//////////////////
const Editingbox2 = () => {
   //🔥 Adding Node!
  const reactFlowWrapper = useRef(null); // useRef
  const connectingNodeId = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);


  const {projectId} = useStore();
   //for saving
  const [rfInstance, setRfInstance] = useState(null);

  const { project, setViewport } = useReactFlow();
   //Adding Node by lining
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  //🔥 DRAG Adding Node! --> nodeId not set yet!
  const onConnectStart = useCallback((_, {nodeId}) => {
   connectingNodeId.current = nodeId;
}, []);

const onDragOver = useCallback((event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}, []);

const onDrop = useCallback(
  (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    
    //🐤 여기서 아무래도 current 세팅을 해주는 것 같은 데 확인 해봐야할 것 같음
    const type = event.dataTransfer.getData('application/reactflow');
    const img = event.dataTransfer.getData('data/imageurl');
    console.log('🌲Getting type ', type); // 🍎 drag start에서 가져온 type
    console.log('🌲Getting image ', img); // 🍎 drag start에서 가져온 image

    //🥰 타입 확인 하기
    if (typeof type === 'undefined' || !type) {
      return;
    }

    //🌸 position 확인하기 새로 떨어뜨, react flow의 인스턴스를 사용
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getNodeId(),
      type,
      position,
      data: { label: `${type} node` , url: `${img}`},
    };

    setNodes((nds) => nds.concat(newNode)); //🌸 webrtc 전에 있는 코드, 개인 편집
    
  },
  [reactFlowInstance]
);


const [nodeName, setNodeName] = useState("Node 1");

//🔥 Adding Node! --> nodeId not set yet!
const onConnectEnd = useCallback(
   (event) => {
       const targetIsPane = event.target.classList.contains('react-flow__pane');
       
       if (targetIsPane){
           const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
           const id = getNodeId();
           const newNode = {
               id,
               // we are removing the half of the node width (75) to center the new node
               position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
               // type: 'textUpdater',
               data: { label: `새로운 노드 ${id}`  },
             };
           setNodes((nds) => nds.concat(newNode));
           console.log(nodes);
           setEdges((eds) => eds.concat({id: `e${connectingNodeId.current}-${id}`, source: connectingNodeId.current, target: id}));
           console.log(initialNodes)
       }
   },
   [project]
);
  
  
  // Connet, Save and restore adding
  
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
      console.log('flow: ', flow);
      // console.log(type(flow.nodes));
      console.log('only node data: ', flow.nodes);
      console.log('only edge data: ', flow.edges);
    }
  }, [rfInstance]);

  const onFullSave = useCallback(() => {
   if (rfInstance) {
     const flow = rfInstance.toObject();
     localStorage.setItem(flowKey, JSON.stringify(flow));
     console.log(JSON.stringify(flow));
     console.log('flow: ', flow);
     // const send_flow = JSON.parse(JSON.stringify(flow));
     console.log('only node data: ', flow.nodes);
     console.log('only edge data: ', flow.edges);
     // console.log(localStorage)
     console.log('sending: ', {'nodes': flow.nodes})

     axios.post(`http://localhost:4000/nodes/${projectId}`, {
        "nodes": flow.nodes
     }).then((res , err) => {
        if (res.status === 200) {
           console.log('nodes saved');
        }
        else (console.log(err))
    });
    axios.post(`http://localhost:4000/edges/${projectId}`, {
     "edges": flow.edges
     }).then((res , err) => {
     if (res.status === 200) {
        console.log('edges saved');
     }
     else (console.log(err))
     });

   }
 }, [rfInstance]);



  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const onAdd = useCallback(() => {
    const newNode = {
      id: getNodeId(),
      data: { label: 'Added node' },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  useEffect(() => {
   setNodes((nds) =>
     nds.map((node) => {
       if (node.selected === true) {
         // it's important that you create a new object here
         // in order to notify react flow about the change
         node.data = {
           ...node.data,
           label: nodeName
         };
       }

       return node;
     })
   );
 }, [nodeName, setNodes]);

  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{ width: '80vw', height: '50vh' }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      style= {{background : '#F3B0C3'}} // Mint!
      // style= {{background : '#00008B'}} //
      // onInit={setRfInstance}
      fitView
      fitViewOptions={fitViewOptions}>
      <Controls/>
      <MiniMap/>
    </ReactFlow>
    </div>
    <Picturebar/>
    </>
  );
};

export default () => (
  <>
  {/* <Modal/> */}
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
