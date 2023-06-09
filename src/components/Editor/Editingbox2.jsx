// 컴포넌트
import React, { useRef, useEffect, useCallback } from 'react';
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
import LazyPicNode from './Node/LazyPicNode.js';

//엣지 타입
import ConnectionLine from './Edge/ConnectionLine'
import CustomEdge from './Edge/CustomEdge';

// 리액트 플로우 노드 
import ReactFlow, { ReactFlowProvider, useReactFlow, Controls, MiniMap, Background, BackgroundVariant} from 'reactflow';
import { WebsocketProvider } from 'y-websocket';

// :four_leaf_clover: WebRTC setting
import { useNodesStateSynced } from '../../hooks/useNodesStateSynced';
import { useEdgesStateSynced } from '../../hooks/useEdgesStateSynced';
import  VoiceChat  from './Voice/VoiceBar'

import { useParams } from "react-router-dom";
import axios from 'axios';
import * as awarenessProtocol from 'y-protocols/awareness.js'

import {createNewDoc } from './ydoc'

import { useUserStore } from './../store';


//:dolphin: 웹 알티시 테스팅
const proOptions = {
  account: 'paid-pro',
  hideAttribution: true,
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
  TextNode3 : TextNode3,
  pix: PictureNode,
  LazyPicNode: LazyPicNode
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
let ydoc = createNewDoc();
export const nodesMap = ydoc.getMap('nodes');
export const edgesMap = ydoc.getMap('edges');

const wsOpts = {
  connect: false,
  params: {},
  awareness: new awarenessProtocol.Awareness(ydoc)
};

function Editingbox2 () {
  const { userName } = useUserStore(state => ({ userName: state.userName }));
  const {projectId} = useParams();  
  const { fitView } = useReactFlow();
  
  const wsProvider = new WebsocketProvider(
    //'ws://localhost:1234', // :fire: 요청을 보낼 웹소켓 서버
    'wss://phodo.store/ws', // 🔥 요청을 보낼 웹소켓 서버
    projectId, // :fire: 프로젝트 아이디
    ydoc, // :fire: 새롭게 전달 받을 도큐먼트 
    wsOpts
  );

  useEffect(() => {
    if (wsProvider && wsProvider.connected) {
      // Disconnect if connected
      wsProvider.disconnect();
  }
    wsProvider.connect();
    wsProvider.on('status', event => {
      console.log(event);
      console.log(event.status);
      if (event.status === "connecting") {
        console.log("Connecting to WebSocket...");
      } else if (event.status === "connected") {
        console.log("Successfully connected");
      }
    });
    // 시도는 해볼 수 있잖아 ?  
    const awareness = wsProvider.awareness;
    awareness.setLocalState({name: userName });
    awareness.on('change', changes => {
      // Whenever somebody updates their awareness information,
      // we log all awareness information from all users.
      console.log(Array.from(awareness.getStates().values()))
    })

    // ydoc = createNewDoc();
      // :star2: Fetch nodes from the API
// :star2: Fetch project data from the API
  // axios.get(`http://localhost:4000/project/${projectId}`)
  axios.get(`https://hyeontae.shop/project/${projectId}`)
  .then((res) => {
    const data = res.data; 
    console.log(res.data);
    nodesMap.clear();
    edgesMap.clear();

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
  return () => {
    wsProvider.disconnect();
    console.log('dismount!');

    // ydoc = createNewDoc();
    
  };
}, [projectId]);

  
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
      
      // Drag을 통한 데이터 패킹
      const type = event.dataTransfer.getData('application/reactflow');
      const categories = event.dataTransfer.getData('data/categories');
      const memo = event.dataTransfer.getData('data/memo');
      const title = event.dataTransfer.getData('data/title');
      const content = event.dataTransfer.getData('data/content');
      const date = event.dataTransfer.getData('data/date');

      const imageurl = event.dataTransfer.getData('data/imageurl');
      const thumburl = event.dataTransfer.getData('data/thumburl');
      const networkState = event.dataTransfer.getData('data/networkState');

      // 지금 데이터 만드는 사람 
      const owner = event.dataTransfer.getData('data/owner');
      const using = event.dataTransfer.getData('data/using');


      console.log(':evergreen_tree:Getting type ', type); // :apple: drag start에서 가져온 type
      console.log(':evergreen_tree:Getting image ', imageurl); // :apple: drag start에서 가져온 image
      console.log('owner: ', owner); 
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
        data: { label: `${type}` , imageurl: `${imageurl}`, categories: `${categories}`, memo: `${memo}`, thumburl: `${thumburl}`,
                title: `${title}`, content: `${content}`, date: `${date}`,  networkState: `${networkState}`, owner: `${owner}`,
                using: `${using}`},
      };

      nodesMap.set(newNode.id, newNode);
  },
    [project]
  );

  // useEffect(() => {
  //   fitView({ duration: 400 });
  // }, [nodes, fitView]);

  return (
    <>
    <div className= "wrapper" ref={reactFlowWrapper} style={{position: 'absolute',top:0, bottom:0, left:0, right:0, Index:-1111, height: '100vh'}}>
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
      style={{ background: '#23173B', position: 'relative' }}
      // fitView
      snapToGrid = {true}
      snapGrid = {[50, 50]}
      fitViewOptions={fitViewOptions}>
      <Controls position='top-left' style={{top:'68px'}} />
      <MiniMap pannable position='bottom-left'/>
      <Background id="1" gap={30} color="#6F6F6F" variant={BackgroundVariant.Cross} />
      <Background id="2" gap={300} offset={1} color="#6F6F6F" variant={BackgroundVariant.Lines} />
    <div>
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

const ReactFlowWrapper = (props) => {
  return (
  <ReactFlowProvider>
    <Editingbox2 {...props} />
  </ReactFlowProvider>
);
};

export default ReactFlowWrapper;