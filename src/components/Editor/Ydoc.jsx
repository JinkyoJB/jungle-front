// YjsDoc.jsx

import React, { useState, useEffect } from 'react';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import Editingbox2 from './Editingbox2';

const YjsDoc = ({ projectId }) => {
  const {projectId} = useParams();
  /* * 
   * 🐬 Ydoc 세팅 
   * */
  
  // 🐬 ydocument 생성
  const ydoc = new Doc();
  console.log('ydoc created : ', ydoc)

  let reconnectionAttempts = 0;
  const MAX_RECONNECTION_ATTEMPTS = 5; // Set your limit

  const wsProvider = new WebsocketProvider(
    'wss://phodo.store/ws', // 🔥 요청을 보낼 웹소켓 서버
    projectId, // 🔥 프로젝트 아이디
    ydoc
  );
  console.log('wsprovider created : ', wsProvider);

  useEffect(() => {
  wsProvider.on('status', event => {
    console.log(event);
    console.log(event.status);
    if (event.status === "disconnected") {
      reconnectionAttempts++;
      
      if (reconnectionAttempts > MAX_RECONNECTION_ATTEMPTS) {
        console.log("Max reconnection attempts reached");
        wsProvider.disconnect(); // Disconnect the provider
      }
    } else if (event.status === "connected") {
      reconnectionAttempts = 0; // Reset the counter on successful connection
    }
  })}, []);


  const nodesMap = ydoc.getMap('nodes');
  const edgesMap = ydoc.getMap('edges');
