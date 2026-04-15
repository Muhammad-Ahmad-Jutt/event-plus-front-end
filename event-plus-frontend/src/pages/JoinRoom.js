import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function JoinRoomLink() {
const [room_id, setRoom_id] = useState()
const navigate = useNavigate()
const join_room_function = (room_id) => {
    setRoom_id(room_id) // ✅ hardcoded for now, replace with actual input value
    navigate(`{process.env.REACT_APP_API_URL}/room/${room_id}`)
}
    return (
        <div>
            <h1>Join Room</h1>
            <input placeholder="Enter room ID" id="room-id" />
            <button onClick={() => {join_room_function(document.getElementById('room-id').value)}}>Join</button>
        </div>
    )
}