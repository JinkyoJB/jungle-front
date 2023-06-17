// Y.js 라이브러리 가져오기
import * as Y from "yjs";
import { WebRTCProvider } from "y-webrtc";

// 문서(Doc) 생성
const doc = new Y.Doc();

// 현재 시간을 기반으로 하는 방 ID 생성 함수
function generateRoomID() {
    const timestamp = Date.now();
    return `y-tldraw-${timestamp}`;
}

// 방 Id 생성
const roomID = generateRoomID();

// WebRTC provider 생성 : WebRTC 동기화
const provider = new WebRTCProvider(roomID, doc, {
  // WebRTC 시그널링 서버 URL  
  signaling: "wss://signaling-server-url", 
});

// provider의 awareness 변수 할당
const awareness = provider.awareness;

// Y.Map을 사용하여 Node와 Edge를 위한 맵 생성
const yNodes = doc.getMap("nodes");
const yEdges = doc.getMap("edges");

// 노드와 엣지를 이전 상태로 되돌리기 위한 undo Manager 생성
const undoManager = new Y.UndoManager([yNodes, yEdges]);

// 새로운 노드 생성 함수
function createNode(nodeId, nodeData) {
  yNodes.set(nodeId, nodeData);
}

// 새로운 엣지 생성 함수
function createEdge(edgeId, edgeData) {
  yEdges.set(edgeId, edgeData);
}

// 새로운 노드와 엣지 생성을 감지하는 이벤트 리스너 등록
yNodes.observe(createNode);
yEdges.observe(createEdge);
