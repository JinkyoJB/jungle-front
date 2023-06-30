// 컴포넌트
import React, { useState, useRef, useEffect, useCallback } from 'react';
import MenuBarR from "../../components/Editor/MenuBarR";

// 스타일 시트
import 'reactflow/dist/style.css';
import './index.css';
// 노드 타입
import MemoNode from './Node/MemoNode';
import MemoNodeB from './Node/MemoNodeB';
import MemoNodeG from './Node/MemoNodeG'; 
import MemoNodeP from './Node/MemoNodeP';
import MemoNodeV from './Node/MemoNodeV';
import PictureNode from './Node/PictureNode.js';
import TaskNameNode from './Node/TaskNameNode';
import TextNode1 from './Node/TextNode';
import TextNode2 from './Node/TextNode2';
import TextNode3 from './Node/TextNode3';

//엣지 타입
import ConnectionLine from './Edge/ConnectionLine'
import CustomEdge from './Edge/CustomEdge';

// 리액트 플로우 노드 
import ReactFlow, { updateEdge, MarkerType, ReactFlowProvider, useReactFlow, Controls, MiniMap, Background, BackgroundVariant} from 'reactflow';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';

// :four_leaf_clover: WebRTC setting
import { useNodesStateSynced } from '../../hooks/useNodesStateSynced';
import { useEdgesStateSynced } from '../../hooks/useEdgesStateSynced';
import  VoiceChat  from './Voice/VoiceBar'

import { useParams } from "react-router-dom";
import axios from 'axios';
import * as awarenessProtocol from 'y-protocols/awareness.js'

import {createNewDoc } from './ydoc'
import useAutoLayout from './useAutoLayout';


//:dolphin: 웹 알티시 테스팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  markerEnd: { type: MarkerType.Arrow },
  pathOptions: { offset: 5 },
};

//:dolphin: 노드 타입 세팅
const nodeTypes = {
  MemoNode : MemoNode,
  MemoNodeB : MemoNodeB,
  MemoNodeG : MemoNodeG,
  MemoNodeP : MemoNodeP,
  MemoNodeV : MemoNodeV,
  TaskNameNode : TaskNameNode,
  TextNode1: TextNode1, 
  TextNode2 : TextNode2,
  TextNode3 , TextNode3,
  pix: PictureNode
};

//
const edgeTypes = {
  coloredge : CustomEdge
}


//:dolphin: 노드 아이디 세팅
let id = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
const getNodeId = () => `${id++}`;

const fitViewOptions = {
   padding: 3,
 };

   /* * 
    * Ydoc 세팅 
    * */
export const ydoc = createNewDoc();
export const nodesMap = ydoc.getMap('nodes');
export const edgesMap = ydoc.getMap('edges');

const wsOpts = {
  connect: false,
  params: {},
  awareness: new awarenessProtocol.Awareness(ydoc)
};

const Editingbox2 = () => {
  const {projectId} = useParams();  

//   const wsProvider = new WebsocketProvider(
//     // 'ws://localhost:1234', // :fire: 요청을 보낼 웹소켓 서버
//     'wss://phodo.store/ws', // 🔥 요청을 보낼 웹소켓 서버
//     projectId, // :fire: 프로젝트 아이디
//     ydoc, // :fire: 새롭게 전달 받을 도큐먼트 
//     wsOpts
//   );
  

//   useEffect(() => {
//     wsProvider.connect();
//     wsProvider.on('status', event => {
//       console.log(event);
//       console.log(event.status);
//       if (event.status === "connecting") {
//         console.log("Disconnected, stopping reconnection attempts");
//         wsProvider.disconnect(); // Stop the connection attempts
//       } else if (event.status === "connected") {
//         console.log("Successfully connected");
//       }
//     });
//       // :star2: Fetch nodes from the API
// // :star2: Fetch project data from the API
//   // axios.get(`http://localhost:4000/project/${projectId}`)
//   axios.get(`https://hyeontae.shop/project/${projectId}`)
//   .then((res) => {
//     const data = res.data; 
//     console.log(res.data);

//     // Check if nodes data exists and is an array
//     if (data.node && Array.isArray(data.node)) {
//       // Loop over nodes array and set each node in the nodesMap
//       data.node.forEach(node => {
//         if (node && node.id) {
//           nodesMap.set(node.id, node);
//         }
//       });
//     } else {
//       console.log("No nodes data received or it is not an array.");
//     }

//     // Check if edges data exists and is an array
//     if (data.edge && Array.isArray(data.edge)) {
//       // Loop over edges array and set each edge in the edgesMap
//       data.edge.forEach(edge => {
//         if (edge && edge.id) {
//           edgesMap.set(edge.id, edge);
//           console.log(edgesMap);
//         }
//       });
//     } else {
//       console.log("No edges data received or it is not an array.");
//     }
//   })
//   .catch((err) => console.error(err)); // Use console.error to log errors
//   }, []);
  

  const [edges, onEdgesChange, onConnect] = useEdgesStateSynced(ydoc);
  const [nodes, onNodesChange] = useNodesStateSynced(ydoc, edgesMap);


  /* * 
   * :dolphin: 아니셜라이징 세팅
   * */
  
  const reactFlowWrapper = useRef(null); // 큰 react flow wrapper
  
  const { project } = useReactFlow();

  // 🍀:blossom: 기존에 드래그와 동일, 근데 기존은 그냥 컴포넌트 밖에다 세팅이 되어있음
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  //DragStart 후 편집창에 데이터 input하는 부분!
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      //:baby_chick: 여기서 아무래도 current 세팅을 해주는 것 같은 데 확인 해봐야할 것 같음
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      
      // Drag을 통한 이벤트 생성
      const type = event.dataTransfer.getData('application/reactflow');
      const img = event.dataTransfer.getData('data/imageurl');
      const tags = event.dataTransfer.getData('data/tags');
      const memo = event.dataTransfer.getData('data/memo');
      const title = event.dataTransfer.getData('data/title');
      const content = event.dataTransfer.getData('data/content');
      const date = event.dataTransfer.getData('data/date');
      console.log(':evergreen_tree:Getting type ', type); // :apple: drag start에서 가져온 type
      console.log(':evergreen_tree:Getting image ', img); // :apple: drag start에서 가져온 image 
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
        data: { label: `${type}` , url: `${img}`, tags: `${tags}`, memo: `${memo}`, 
                title: `${title}`, content: `${content}`, date: `${date}`},
      };

      nodesMap.set(newNode.id, newNode);
    },
    
  );

  const createNewNode = useCallback((nodeId, node) => {
    const position = {
      x: node.position.x,
      y: node.position.y + 300,
    };

    const newNode = {
      id: getNodeId(),
      type: node.type,
      position,
      data: {
        label: `${node.type}`,
        url: `${node.data.url}`,
        tags: `${node.data.tags}`,
        memo: `${node.data.memo}`,
        title: 'New Node',
        content: 'New Node Content',
        date: 'New Node Date',
      },
    };

    nodesMap.set(newNode.id, newNode);

    // 기존 노드의 아래쪽에서 새로운 노드의 위로 향하는 새로운 엣지 생성
    const newEdge = {
      id: getNodeId(),
      source: node.id,
      target: newNode.id,
      type: 'smoothstep', // Set the edge type to 'smoothstep'
      markerEnd: { type: 'Arrow' }, // Add a markerEnd with type 'Arrow'
      pathOptions: { offset: 5 }, // Add pathOptions with offset 5
    };

    edgesMap.set(newEdge.id, newEdge);
  }, []);

  const onNodeClick = useCallback((event, node) => {
    createNewNode(node.id, node);
  }, [createNewNode]);

  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);
  const onLoad = (rfInstance) => setReactFlowInstance(rfInstance);

  useEffect(() => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView();
    }
  }, [reactFlowInstance]);

  useAutoLayout({ direction: 'LR' });

  // const onConnect = (params) => {
  //   const { source, target, sourceHandle, targetHandle } = params;

  //   const newEdge = {
  //     id: `${source}-${sourceHandle}-${target}-${targetHandle}`,
  //     source,
  //     target,
  //     sourceHandle,
  //     targetHandle,
  //     type: 'customedge',
  //   };

  //   reactFlowInstance && reactFlowInstance.addEdge(newEdge);
  // };

  const onElementUpdate = (oldElement, newElement) => {
    if (oldElement.position && newElement.position && oldElement.position !== newElement.position) {
      updateEdge(oldElement, newElement);
    }
  };

  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{Index:0, height: '100vh'}}>
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      connectionLineComponent={ConnectionLine}
      onConnect={onConnect}
      onDrop={onDrop}
      onDragOver={onDragOver}
      proOptions={proOptions}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      style={{ background: '#CCCCCC', position: 'relative' }}
      fitView
      fitViewOptions={fitViewOptions}
      onElementUpdate={onElementUpdate}
      onNodeClick={onNodeClick}>
      <Controls position='top-left' style={{top:'68px'}} />
      <MiniMap pannable position='bottom-left'/>
      <Background id="1" gap={30} color="#ffffff" variant={BackgroundVariant.Cross} />
      <Background id="2" gap={300} offset={1} color="#ffffff" variant={BackgroundVariant.Lines} />
    <div style={{zIndex: 150 }}>
      <MenuBarR />
    </div>
    </ReactFlow>
    </div>
    <div style={{ position: 'absolute',left: '50px', top: '70px', zIndex: 100 }}>
      <VoiceChat />
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