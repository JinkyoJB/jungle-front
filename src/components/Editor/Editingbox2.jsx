import React, { useEffect, useState, useRef , useCallback } from 'react';
// import style sheets
import 'reactflow/dist/style.css';
import './index.css';

// 🍀 import Node Types
import TextNode from './Node/TextNode';
import PictureNode from './Node/PictureNode.js';

// 🍀 import Component
import Modal from './Modal';
import Sidebar from '../Editor/SideBar/Sidebar';
import MenuBarR from "../../components/Editor/MenuBarR";

// 🍀 WebSocket Node 
import useNodesStateSynced, { nodesMap } from '../../hooks/useNodesStateSynced';
import useEdgesStateSynced from '../../hooks/useEdgesStateSynced';

// 🍀 React Flow 
import ReactFlow, {
  ReactFlowProvider, useNodesState, useEdgesState, addEdge,useReactFlow, Panel, Controls,
  MiniMap, NodeToolbar } from 'reactflow';

// 🍀 Zustand 모달창에서 받아오는 것
import {create} from 'zustand';


// 🐬 프로젝트 아이디 받을려면 이것을 가져와야한다
export const useStore = create((set,get) => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
  rfInstance: null,
}));

//🐬 웹 알티시 테스팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const flowKey = 'example-flow'; //🧞‍♂️ 이거 뭐지? 굳이 필요하나?

const nodeTypes = {TextNode: TextNode, 
                  pix: PictureNode,
                }

//🐬 새로 생기는 노드 Id 설정
let id = 10; 
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };


const Editingbox2 = () => {
   
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  //🍀 webrtc 세팅 : 및 파일에서 함수 빼오기
  const [nodes, onNodesChange] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
  const { project, setViewport } = useReactFlow();

  //🍎 Saving 해놓기 위한 준비 작업
  const [rfInstance, setRfInstance] = useState(null);

  const onSave = useCallback(() => {
    if (rfInstance){
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));

      //🌵 Console Testing
      console.log(JSON.stringify(flow));
      console.log('flow: ', flow);
      console.log('only node data: ', flow.nodes);
      console.log('only edge data: ', flow.edges);
    }
  }, [rfInstance]);


  // 🍀🌼 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // 🍀🌼 DragStart 후 편집창에 데이터 input하는 부분!
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      //🐤 여기서 아무래도 current 세팅을 해주는 것 같은 데 확인 해봐야할 것 같음
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Drag을 통한 이벤트 생성
      const type = event.dataTransfer.getData('application/reactflow');
      const img = event.dataTransfer.getData('data/imageurl');
      const tags = event.dataTransfer.getData('data/tags');
      console.log('🌲Getting type ', type); // 🍎 drag start에서 가져온 type
      console.log('🌲Getting image ', img); // 🍎 drag start에서 가져온 image 
      //🥰 타입 확인 하기: 굳이 ? 
      if (typeof type === 'undefined' || !type) {
        return;
      }

      //🌸 position 확인하기 새로 떨어뜨, react flow의 인스턴스를 사용
      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: getNodeId(),
        type,
        position,
        data: { label: `${type}` , url: `${img}`, tags: `${tags}`},
      };

      //🌼 webrtc 전에 있는 코드, 개인 편집
      // setNodes((nds) => nds.concat(newNode)); 
      nodesMap.set(newNode.id, newNode);
    },
    //🌼 webrtc 전에 있는 코드, 개인 편집
    // [reactFlowInstance]
  );


  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{ height: '100vh'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      // onConnectStart={onConnectStart}
      // onConnectEnd={onConnectEnd}
      onInit={setRfInstance} 
      onDrop={onDrop}
      onDragOver={onDragOver}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      style= {{background : '#F3B0C3', position:'relative'}} // Mint!
      // style= {{background : '#00008B'}} //
      // onInit={setRfInstance}
      fitView
      fitViewOptions={fitViewOptions}>
      <Controls position='top-left'/>
      <MiniMap pannable position='bottom-left'/>

    </ReactFlow>
    </div>
    <Sidebar/>
    <MenuBarR style={{ position: 'absolute', zIndex: 1000 }} />
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
