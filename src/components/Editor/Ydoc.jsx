import React, { useState, useEffect } from 'react';
import { Doc } from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import Editingbox2 from './Editingbox2';

const YjsDoc = ({ projectId }) => {
  const MAX_RECONNECTION_ATTEMPTS = 5; // Set your limit

  const [ydoc, setYdoc] = useState(null);
  const [nodesMap, setNodesMap] = useState(null);
  const [edgesMap, setEdgesMap] = useState(null);
  const [wsProvider, setWsProvider] = useState(null);
  let reconnectionAttempts = 0;

  useEffect(() => {
    // 🐬 ydocument 생성
    const doc = new Doc();
    console.log('ydoc created : ', doc)

    const provider = new WebsocketProvider(
      'wss://phodo.store/ws', // 🔥 요청을 보낼 웹소켓 서버
      projectId, // 🔥 프로젝트 아이디
      doc
    );
    console.log('wsprovider created : ', provider);
  
    provider.on('status', event => {
      console.log(event);
      console.log(event.status);
      if (event.status === "disconnected") {
        reconnectionAttempts++;
        
        if (reconnectionAttempts > MAX_RECONNECTION_ATTEMPTS) {
          console.log("Max reconnection attempts reached");
          provider.disconnect(); // Disconnect the provider
        }
      } else if (event.status === "connected") {
        reconnectionAttempts = 0; // Reset the counter on successful connection
      }
    });
  
    setYdoc(doc);
    setWsProvider(provider);
    setNodesMap(doc.getMap('nodes'));
    setEdgesMap(doc.getMap('edges'));

  }, [projectId]);

  return (
    ydoc && nodesMap && edgesMap ?
    <Editingbox2 ydoc={ydoc} nodesMap={nodesMap} edgesMap={edgesMap} />
    : null
  );
}

export default YjsDoc;
