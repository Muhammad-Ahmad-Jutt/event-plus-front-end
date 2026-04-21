import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { io } from "socket.io-client";
import bg from "../images/event-plus-bg.png";

export default function JoinRoom() {
  const { room_id } = useParams();
  const { token } = useContext(AuthContext);

  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  //client-side rate limitting
  const lastSend = useRef(null);
  const [cooldown, setCooldown] = useState(false);
  const  MS_COOLDOWN = 3000;

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

    // client-side rate-limitting
    if (lastSend != null && (Date.now() - lastSend.current < MS_COOLDOWN)) {
      return;
    }

    if (!input.trim()) return;

    const payload = {
      room_id,
      message: input,
    };

    socketRef.current.emit("message", payload);
    // console.log('sent message to websocket service...') //testing line comment this an un-comment above line

    //updating lastSent timestamp
    lastSend.current = Date.now();

    setMessages((prev) => [
      ...prev,
      { message: input, user: "me" },
    ]);

    setInput("");

    //sleep send button
    setCooldown(true);
    setTimeout(() => setCooldown(false), MS_COOLDOWN); 
  };

  const endEvent = () => {};

  return (
    <>
    <style>{`    
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }


    .page {
      padding: 24px;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      font-family: Arial, sans-serif;
    }

    .container {
      background: #ffffff;
      width: 100%;
      max-width: 940px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      padding: 24px;
    }


    .header {
      margin-bottom: 16px;
    }

    .eventTitle {
      font-size: 18px;
      font-weight: 600;
      margin-top: 20px;
      margin-bottom: 5px;
    }

    .metaRow {
      display: flex;
      gap: 16px;
      font-size: 14px;
    }

    .status {
      background: #dcfce7;
      color: #15803d;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .live-dot {
      width: 10px;
      height: 10px;
      background-color: #ff2d2d;
      border-radius: 50%;
      box-shadow: 0 0 6px #ff2d2d, 0 0 12px #ff2d2d;
    }

    .section {
      margin-top: 20px;
      background-color: #FFD7001A;
      padding: 20px 20px;
      border-radius: 10px;
    }

    .sectionTitle {
      font-weight: 600;
      margin-bottom: 25px;
    }


    .messages {
      max-height: 240px;
      overflow-y: auto;
      padding-right: 8px;
    }

    .messageRow {
      display: flex;
      gap: 12px;
      margin-bottom: 12px;
    }

    .profile {
      background: #bfdbfe;
      color: #1d4ed8;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    .messageBox {
      background: #f3f4f6;
      padding: 12px;
      border-radius: 8px;
      width: 100%;
    }

    .messageHeader {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
    }

    .user {
      font-weight: 600;
    }

    .time {
      color: #6b7280;
    }

    .text {
      font-size: 14px;
      margin-top: 4px;
    }

    .askBox {
      margin-top: 24px;
      background: #8B45131A;
      padding: 16px;
      border-radius: 10px;
    }

    .select {
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 6px;
      margin-bottom: 10px;
    }

    .textarea {
      width: 100%;
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 6px;
      min-height: 80px;
      box-sizing: border-box;
    }


    .rightAlign {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    /* Buttons */
    .btnPrimary {
      background: #00BA46;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      height: 40px;
    }

    .btnPrimary:disabled {
      background: #ccc;
      cursor: not-allowed;
      opacity: 0.7;
    }


    .btnDanger {
      width: 100%;
      background: #ef4444;
      color: white;
      padding: 10px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    .endSection {
      margin-top: 24px;
    }

    .topheaderview {
      background: #FFEEE7;
      border-radius: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 10px 8px;
      box-sizing: border-box;
    }

    .title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
    }

    .statusview {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .status {
      font-size: 14px;
      padding: 4px 8px;
      border-radius: 6px;
      background-color: #e6f4ea;
      color: #1e7e34;
    }

    .endEvent {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background-color: #e74c3c;
      color: white;
      cursor: pointer;
    }

    .endEvent:hover {
      background-color: #c0392b;
    }
    `}</style>


    <div className="page" style={{
        padding: "24px",
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
        }}>

    <div className="container">

      {/* Header */}
        <div className="header">
            <div className="topheaderview">
              <h2 className="title">Live Event</h2>
              <div className="statusview">
                {/*<span className="live-dot"></span>*/}
                <span className="status">Active</span>
                {/*
                <button onClick={endEvent} className="endEvent">
                    End Event
                </button>
                */}
              </div>
            </div>
      </div>

      <div style={{
        marginBottom: 10,
      }}>
        <p><b>Room:</b> {room_id}</p>
      </div>
      
      {/* Messages */}
      <div className="section">
          <h4 className="sectionTitle">Live Q&A Feed</h4>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: 10,
          borderRadius: 10,
          backgroundColor: "white"
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            <strong>{msg.user || "user"}:</strong> {msg.message}
          </div>
        ))}
      </div>
      </div>

      {/* Input */}
      <div className="askBox">
       <h4 className="sectionTitle">Ask Question</h4>
       <div style={{ display: "flex", gap: 10, marginTop: 10, alignItems: "center" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          style={{ flex: 1, height: 50, padding: 10, borderRadius: 10 }}
        />

        <button onClick={sendMessage} className="btnPrimary" disabled={cooldown}>
          Send
        </button>
      </div>
      </div>
    </div>
    </div>
    </>
  );
}