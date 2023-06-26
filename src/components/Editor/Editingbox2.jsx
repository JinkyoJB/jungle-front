// 컴포넌트
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Sidebar from '../Editor/SideBar/Sidebar';
import MenuBarR from "../../components/Editor/MenuBarR";

// 스타일 시트
import 'reactflow/dist/style.css';
import './index.css';
// 노드 타입
import TextNode from './Node/TextNode';
import PictureNode from './Node/PictureNode.js';
// 리액트 플로우 노드 
import ReactFlow, { ReactFlowProvider, useReactFlow, Controls, MiniMap} from 'reactflow';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// 🍀 WebRTC setting
import { useNodesStateSynced } from '../../hooks/useNodesStateSynced';
import { useEdgesStateSynced } from '../../hooks/useEdgesStateSynced';
import  VoiceChat  from './Voice/VoiceBar'

import { useParams } from "react-router-dom";
import axios from 'axios';
import * as awarenessProtocol from 'y-protocols/awareness.js'

//🐬 과금버전 세팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

//🐬 노드 타입 세팅
const nodeTypes = {
  TextNode: TextNode, 
  pix: PictureNode
};

//🐬 노드 아이디 세팅
let id = 100; 
const getNodeId = () => `${id++}`;
const fitViewOptions = {
   padding: 3,
 };

   /* * 
   * 🐬 Ydoc 세팅 
   * */
const ydoc = new Doc();

const wsOpts = {
  connect: false,
  params: {},
  awareness: new awarenessProtocol.Awareness(ydoc)
};

const Editingbox2 = () => {
  const {projectId} = useParams();  
  

  const wsProvider = new WebsocketProvider(
    'wss://phodo.store/ws', // 🔥 요청을 보낼 웹소켓 서버
    projectId, // 🔥 프로젝트 아이디
    ydoc, // 🔥 새롭게 전달 받을 도큐먼트 
    wsOpts
  );
  const nodesMap = ydoc.getMap('nodes');
  const edgesMap = ydoc.getMap('edges');

  useEffect(() => {
    wsProvider.connect();
    wsProvider.on('status', event => {
      console.log(event);
      console.log(event.status);
      if (event.status === "connecting") {
        console.log("Disconnected, stopping reconnection attempts");
        wsProvider.disconnect(); // Stop the connection attempts
      } else if (event.status === "connected") {
        console.log("Successfully connected");
      }
    });
      // 🌟 Fetch nodes from the API
// 🌟 Fetch project data from the API
  // axios.get(`http://localhost:4000/project/${projectId}`)
  axios.get(`https://hyeontae.shop/project/${projectId}`)
  .then((res) => {
    const data = res.data; 
    console.log(res.data);

    // Check if nodes data exists and is an array
    if (data.node && Array.isArray(data.node)) {
      // Loop over nodes array and set each node in the nodesMap
      data.node.forEach(node => {
        if (node && node.id) {
          nodesMap.set(node.id, node);
        }
      });
    } else {
      console.log("No nodes data received or it is not an array.");
    }

    // Check if edges data exists and is an array
    if (data.edge && Array.isArray(data.edge)) {
      // Loop over edges array and set each edge in the edgesMap
      data.edge.forEach(edge => {
        if (edge && edge.id) {
          edgesMap.set(edge.id, edge);
          console.log(edgesMap);
        }
      });
    } else {
      console.log("No edges data received or it is not an array.");
    }
  })
  .catch((err) => console.error(err)); // Use console.error to log errors
  }, []);
  

  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced(ydoc);
  const [nodes, onNodesChange] = useNodesStateSynced(ydoc, edgesMap);

  /* * 
   * 🐬 아니셜라이징 세팅
   * */
  
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  
  const { project } = useReactFlow();

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
      if (typeof type === 'undefined' || !type) {
        return;
      }


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

      nodesMap.set(newNode.id, newNode);
    },
    
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
      onDrop={onDrop}
      onDragOver={onDragOver}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      style= {{background : '#F3B0C3', position:'relative'}} 
      fitView
      fitViewOptions={fitViewOptions}>
      <Controls position='top-left'/>
      <MiniMap pannable position='bottom-left'/>

    </ReactFlow>
    </div>

    <Sidebar/>
    <div style={{ position: 'absolute',left: '50px', top: '70px', zIndex: 100 }}>
      <VoiceChat />
    </div>
    <div style={{ position: 'absolute', zIndex: 150 }}>
      <MenuBarR />
    </div>
    </>
  );
};

export default () => (
  <>
  <ReactFlowProvider>
    <Editingbox2 />
  </ReactFlowProvider>
  </>
);
