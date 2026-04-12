import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";

export default function JoinRoom() {
  const { room_id } = useParams();
  const { token } = useContext(AuthContext);

  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!token || !room_id) return;

    // 🔌 Socket.IO connection
    const socket = io(process.env.REACT_APP_SOCKET_URL, {
      query: {
        token,
        room_id,
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ connected:", socket.id);
    });

    // 📩 receive messages
    socket.on("message", (data) => {
      console.log("📩 received:", data);
      setMessages((prev) => [...prev, data]);
    });

    socket.on("disconnect", () => {
      console.log("🔌 disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [room_id, token]);

  // 📤 send message
  const sendMessage = () => {
    if (!input.trim()) return;

    const payload = {
      room_id,
      message: input,
    };

    socketRef.current.emit("message", payload);

    setMessages((prev) => [
      ...prev,
      { message: input, user: "me" },
    ]);

    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Room: {room_id}</h2>

      {/* Messages */}
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user || "user"}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1 }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}