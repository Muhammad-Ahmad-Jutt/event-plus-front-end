import "./index.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { toast } from "react-toastify";

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
        toast.error(data.message);
        logout();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Event deleted successfully");
        fetchEventList(); // Refresh the list
      } else {
        toast.error("Failed to delete event");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting event");
    }
  };

  useEffect(() => {
    fetchEventList();
  }, [user, token, logout]);


  return (
    <div className="homepage-container">
      <h1 className="homepage-title">
        Welcome to Event Plus
      </h1>

      <div className="homepage-content">
        <p>Discover and manage your events with ease.</p>

        {user ? (
          <>
            <h2>Your Events</h2>
            <button onClick={() => navigate("/create-event")}>Create Event</button>
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
                    <button onClick={() => navigate(`/update-event/${event.id}`)}>Update</button>
                    <button onClick={() => deleteEvent(event.id)}>Delete</button>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p>Please sign in to view your events.</p>
        )}
      </div>
    </div>
  );
}