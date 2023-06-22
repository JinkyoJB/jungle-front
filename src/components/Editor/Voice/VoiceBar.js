import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../../../context/SocketProvider";

const VoiceBar = () => {
    const [voiceId, setVoiceId] = useState("");
    const [room, setRoom] = useState("");

    const socket = useSocket();

    console.log("client:", socket);

    const handleSubmitForm = useCallback(
    (e) => {
        e.preventDefault();
        socket.emit('room:join', { voiceId, room });

        console.log("client sending: ", {voiceId,room});
    }, [voiceId, room, socket]);

    useEffect( () => {
        socket.on('room:join', (data) => {
            console.log( `Data from BE ${data}`);
        });
    }, [socket]);

    return (
        <div className="container w-64 h-64">
        <h1>Lobby</h1>
        <form onSubmit={handleSubmitForm}>
            <label htmlFor="voiceId">Voice ID</label>
            <input type="text"
                id="voiceId"
                value={voiceId}
                onChange={(e) => setVoiceId(e.target.value)}/>
            <br />
            <label htmlFor="room">Room Number</label>
            <input type="text"
                id="room"
                value = {room}
                onChange={(e) => setRoom(e.target.value)}/>
            <br />
            <button>Join</button>
        </form>
        </div>
    );
};

export default VoiceBar;