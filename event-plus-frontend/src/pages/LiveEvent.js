import React, { useState, useEffect } from "react";
import "../stylesheets/LiveEvent.css";
import bg from "../images/event-plus-bg.png";



export default function LiveEvent() {
  const [event, setEvent] = useState({
    title: "Tech Conference 2024",
    roomId: "EVT8A32FQ91",
    status: "ACTIVE",
  });

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "John Smith",
      initials: "JS",
      text: "Will the slides be shared after the event?",
      time: "10:32 AM",
    },
    {
      id: 2,
      user: "askjdhasd",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
    {
      id: 3,
      user: "Alakjdf",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
    {
      id: 4,
      user: "sakdjhfasdf",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
    {
      id: 5,
      user: "dksjfnksjdf",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
    {
      id: 6,
      user: "Akjsdhfsdr",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
    {
      id: 7,
      user: "ljkasdflksd",
      initials: "AK",
      text: "Can you explain the roadmap for Q3?",
      time: "10:35 AM",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [type, setType] = useState("text");

  //MARK: backend integration functions
  const connectWebSocket = () => {};
  const sendQuestion = () => {};
  const fetchLiveMessages = () => {};
  const endEvent = () => {};

  useEffect(() => {
    connectWebSocket();
    fetchLiveMessages();
  }, []);

  return (
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
                <span className="live-dot"></span>
                <span className="status">{event.status}</span>
                <button onClick={endEvent} className="endEvent">
                    End Event
                </button>
              </div>
            </div>

          <h3 className="eventTitle">{event.title}</h3>

          <div className="metaRow">
            <p><b>Room ID:</b> {event.roomId}</p>
          </div>
        </div>

        {/* Q&A Feed */}
        <div className="section">
          <h4 className="sectionTitle">Live Q&A Feed</h4>

          <div className="messages">
            {messages.map((msg) => (
              <div key={msg.id} className="messageRow">
                <div className="profile">
                  {msg.initials}
                </div>

                <div className="messageBox">
                  <div className="messageHeader">
                    <span className="user">{msg.user}</span>
                    <span className="time">{msg.time}</span>
                  </div>
                  <p className="text">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ask Question */}
        <div className="askBox">
          <h4 className="sectionTitle">Ask Question</h4>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="select"
          >
            <option value="text">Text</option>
            <option value="poll">Poll</option>
          </select>

          <textarea
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="textarea"
          />

          <div className="rightAlign">
            <button onClick={sendQuestion} className="btnPrimary">
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
