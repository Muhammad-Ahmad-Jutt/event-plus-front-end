import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoomLink() {
const navigate = useNavigate()
const join_room_function = (room_id) => {
    navigate(`/room/${room_id}`)
}
    return (
        <div>
            <h1>Join Room</h1>
            <input placeholder="Enter room ID" id="room-id" />
            <button onClick={() => {join_room_function(document.getElementById('room-id').value)}}>Join</button>
        </div>
    )
}