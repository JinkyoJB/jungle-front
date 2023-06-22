const { Server } = require("socket.io");

const io = new Server(3002, {
  cors: true,
});

const IdToSocketIdMap = new Map();
const SocketIdToIdMap = new Map();

io.on('connection', socket => {
  console.log(`Socket Connected`, socket.id);

  socket.on('room:join', data => {
    console.log("client sended: ", data);

    const { voiceId, room } = data;
    IdToSocketIdMap.set(voiceId, socket.id);
    SocketIdToIdMap.set(socket.id, voiceId);
    socket.to('room:join', data);
  });
});

