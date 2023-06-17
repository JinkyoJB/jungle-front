// import style sheets
import 'reactflow/dist/style.css';
import './text-updater-node.css';

// import Node Types
import TextUpdaterNode from './TextUpdaterNode.js';
import PictureNode from './PictureNode.js';
import PictureNode2 from './PictureNode2.js';
import PictureNode3 from './PictureNode3.js';

// import Component
import Modal from './Modal';

// import React 
import React, { useEffect, useState, useRef ,useCallback } from 'react';

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
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

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
    <div className= "wrapper" ref={reactFlowWrapper} style={{ width: '100vw', height: '100vh' }}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onConnectStart={onConnectStart}
      onConnectEnd={onConnectEnd}
      nodeTypes={nodeTypes}
      style= {{background : '#F3B0C3'}} // Mint!
      // style= {{background : '#00008B'}} //
      onInit={setRfInstance}
      fitView
      fitViewOptions={fitViewOptions}
    >
      <Controls/>
      <MiniMap/>
      <NodeToolbar/>
    </ReactFlow>
    </div>

    <div>
<aside id="sidebar-multi-level-sidebar" class="fixed top-0 right-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
         <li>
            <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 bg-gray-200" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>새 프로젝트</span>                  
            </button>
         </li>
         <br/>
         <li>
            <label> 포도 사용 버튼: </label>
         </li>
         <li>
            <button type="button" onClick={onSave} class=" bg-gray-200 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>잠시 저장하기</span>                  
            </button>
         </li>
         <li>
            <button type="button" onClick={onRestore} class="bg-gray-200 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>되돌아가기</span>                  
            </button>
         </li>
         <li>
            <button type="button" onClick={onAdd} class="flex bg-gray-200 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>추가하기</span>                  
            </button>
         </li>
         <li>
            <button type="button" onClick={onFullSave} class=" bg-gray-200 flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                  <span class="flex-1 ml-3 text-left whitespace-nowrap" sidebar-toggle-item>서버에 저장하기</span>                  
            </button>
            <input type= "text" name="projectname" placeholder='프로젝트 이름 '>
            </input>
         </li>
         <br/>
         <li>
            <label> 사용자 버튼: </label>
         </li>

         <li>
            <a href="#" class="flex bg-gray-200 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">현재 유저</span>
            </a>
         </li>

         <li>
            <a href="/login" class="flex bg-gray-200 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">로그아웃</span>
            </a>
         </li>

         <li>
            <a href="#" class="flex bg-gray-200 items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
               <svg aria-hidden="true" class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd"></path></svg>
               <span class="flex-1 ml-3 whitespace-nowrap">음성 채팅</span>
            </a>
         </li>
         <br/>

         <li>
            <label> 선택한 노드: </label>
            <input value={nodeName}
                   onChange={(evt) => setNodeName(evt.target.value)}/>
         </li>   
      </ul>
   </div>
</aside>

</div>
</>
  );
};

export default () => (
  <>
  <Modal/>
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
