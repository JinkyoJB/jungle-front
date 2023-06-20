// import style sheets
import 'reactflow/dist/style.css';

import './index.css';
// import Node Types
import TextNode from './Node/TextNode';
import PictureNode from './Node/PictureNode.js';

// import Component
import Modal from './Modal';

// 🍀 WebRTC setting
import useNodesStateSynced, { nodesMap } from '../../hooks/useNodesStateSynced';
import useEdgesStateSynced from '../../hooks/useEdgesStateSynced';

// import React 
import React, { useEffect, useState, useRef , useCallback } from 'react';
import Sidebar from '../Editor/SideBar/Sidebar';
import MenuBarR from "../../components/Editor/MenuBarR";


// import React Flow 
import ReactFlow, {
  ReactFlowProvider, useNodesState, useEdgesState, addEdge,useReactFlow, Panel, Controls,
  MiniMap, NodeToolbar } from 'reactflow';

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
const nodeTypes = {TextNode: TextNode, 
                  pix: PictureNode,
                }

// 적어도 100개는 만들지 않을거 아니야 ~ 
let id = 100; 
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };

//////////////////
  // 🍀🌼 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  // const onDragOver = useCallback((event) => {
  //   event.preventDefault();
  //   event.dataTransfer.dropEffect = 'move';
  // }, []);

const Editingbox2 = () => {
   
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  
  //🍀 webrtc 세팅 : 및 파일에서 함수 빼오기
  const [nodes, onNodesChange ] = useNodesStateSynced();
  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced();
  const { project, setViewport } = useReactFlow();

  //🍊 Label 세팅하기 
  // const [nodeName, setNodeName] = useState("Node 1")

  // 🌼 기존 세팅: 엣지 새로 생성
  // const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // 🌼 기존 세팅: 노드끌어서 생성, 첫 시작
  //   const onConnectStart = useCallback((_, {nodeId}) => {
  //    connectingNodeId.current = nodeId;
  // }, []);

  // 🍀🌼 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //DragStart 후 편집창에 데이터 input하는 부분!
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
      // onInit={setReactFlowInstance}
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
  {/* <Modal/> */}
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
