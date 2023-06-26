import { Doc } from 'yjs';
//우리는 소켓연결할 것입니다.
import { WebsocketProvider } from 'y-websocket';


// const ydoc = new Doc();


const wsProvider = new WebsocketProvider(
    // 'ws://13.125.210.252:1234', //🔥 hojun ec2 settin
    // 'wss://phodo.store/ws', //🔥 jinkyo ec2 setting
    'ws://localhost:1234',
    'sample',
    ydoc
);

// wsProvider.on('status', event => {
//     console.log(event)
//     console.log(event.status)
// })

// export default ydoc;