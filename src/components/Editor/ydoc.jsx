import { Doc } from 'yjs';
// For this example we use the WebrtcProvider to synchronize the document
// between multiple clients. Other providers are available.
// You can find a list here: https://docs.yjs.dev/ecosystem/connection-provider
// import { WebrtcProvider } from 'y-webrtc';
import { WebsocketProvider } from 'y-websocket';
import * as awarenessProtocol from 'y-protocols/awareness.js'

const ydoc = new Doc();

// new WebrtcProvider('REACTFLOW-COLLAB-EXAMPLE', ydoc, {
//     signaling : ['ws://localhost:3000/newproject']
// });
const wsOpts = {
    // Set this to `false` if you want to connect manually using wsProvider.connect()
    connect: false,
    // Specify a query-string that will be url-encoded and attached to the `serverUrl`
    // I.e. params = { auth: "bearer" } will be transformed to "?auth=bearer"
    params: {}, // Object<string,string>
    // You may polyill the Websocket object (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).
    // E.g. In nodejs, you could specify WebsocketPolyfill = require('ws')
    // WebsocketPolyfill: Websocket,
    // Specify an existing Awareness instance - see https://github.com/yjs/y-protocols
    awareness: new awarenessProtocol.Awareness(ydoc)
  }


const wsProvider = new WebsocketProvider(
    // 'ws://13.125.210.252:1234', //🔥 hojun ec2 settin
    'wss://phodo.store/ws', //🔥 jinkyo ec2 setting
    'sample',
    ydoc, 
    wsOpts // 연결 방지용
);

// 연결시작
// wsProvider.connect();

// sync 맞추기 위한 것
wsProvider.on('status', event => {
    console.log(event)
    console.log(event.status)
})

export default ydoc;