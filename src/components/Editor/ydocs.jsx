import { Doc } from 'yjs';
// For this example we use the WebrtcProvider to synchronize the document
// between multiple clients. Other providers are available.
// You can find a list here: https://docs.yjs.dev/ecosystem/connection-provider
// 🧞‍♂️ 현재 webrtc로 세팅 되어 있음을 알 수 있다
import { WebrtcProvider } from 'y-webrtc';

const ydoc = new Doc();
new WebrtcProvider('REACTFLOW-COLLAB-EXAMPLE', ydoc);

export default ydoc;
