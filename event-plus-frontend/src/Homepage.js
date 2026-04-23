import "./index.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";
import bg from "./images/event-plus-bg.png";

export default function Homepage() {
  const { user, token, logout } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEventList = async () => {
    try {
      if (!user || !token) return;

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/events_by_organizer`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setEvents(data.events);
      } else {
        toast.info("Login again to view your events.");
        toast.error(data.message);
        logout();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEventList();
  }, [user, token, logout]);


  return (
    <>
    <style>{`
      .pageImg {
            padding: 24px;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            font-family: Arial, sans-serif;
      }
    `}</style>

    
    <div className="pageImg"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "calc(100vh - 60px)",
          fontFamily: "Arial, sans-serif",
          marginTop: "-20px",
          marginBottom: "-40px",
        }}>

    <div className="homepage-container" style={{ width: "100%" }}>
      <h1 className="gradient-text-title">
        Welcome to Event Plus.
      </h1>

      <div className="homepage-content">


        {user ? (
          <>
            <div className="create-event-container">
  <button onClick={() => navigate("/create-event")}>
    Create Event
  </button>
</div>
            {events.length === 0 ? (
              <p>No events found.</p>
            ) : (
              <ul>
                {events.map((event, index) => (
                  <li key={event.id || index}>
                    <button
                      onClick={() => navigate(`/event/${event.id}`)}
                      style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}
                    >
                      <h3>{event.title}</h3>
                    </button>
                    <p>{event.description}</p>
                    <p>Date: {event.date}</p>
                    
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="gradient-text-subtitle">Please sign in to view your events.</p>
        )}
      </div>
    </div>
    </div>
    </>
  );
}