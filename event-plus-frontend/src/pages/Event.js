import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import bg from "../images/event-plus-bg.png";

export default function EventDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  // const [room_id, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ✅ Fetch Event
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch event");
        }
        console.log("Fetched event data:", data);
        setEvent(data.event);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) fetchEvent();
  }, [id, token]);

  // ✅ DELETE FUNCTION (moved outside)
  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/delete_event/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Event deleted successfully");
        navigate("/"); // ✅ redirect instead of refetch
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete event");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error deleting event");
    }
  };

const startEvent = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/events/start_event/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to start event");
    }

    toast.success("Event started successfully");

    console.log(data);

    // ✅ FIXED: use response directly
    navigate(`/room/${data.room_id}`);

  } catch (error) {
    console.error("error", error);
    toast.error("error starting event");
  }
};

  const endEvent = async () => {
    try{
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/end_event/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Failed to end event");
      }
      else{
        toast.success("Event ended successfully");
        navigate("/"); // ✅ redirect instead of refetch
      }
    }
    catch(error){
      console.error("error", error)
      toast.error("error ending event")
    }

  };
  

  if (loading) return <div className="loading-wrapper" style={{ marginTop: "-20px", marginBottom: "-40px"}}><p className="gradient-text-loading">Loading...</p></div>;
  if (error) return <div className="loading-wrapper" style={{ marginTop: "-20px", marginBottom: "-40px"}}><p className="gradient-text-loading">❌ {error}</p></div>;
  if (!event) return <div className="loading-wrapper" style={{ marginTop: "-20px", marginBottom: "-40px"}}><p className="gradient-text-loading">No event found</p></div>;

return (
  <>
  <style>{`
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }

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
          display: "flex",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
          marginTop: "-20px",
          marginBottom: "-40px",
        }}>
          
    <div className="event-details-container">

    {/* 🔥 ACTION BUTTONS (TOP LEFT) */}
    <div className="event-actions">
        <button className="btn start" onClick={startEvent}>
          Start
        </button>
        
      <button className="btn end" onClick={endEvent}>
        End
      </button>
        <button className="btn update" onClick={() => navigate(`/update-event/${event.id}`)}>
          Update
        </button>

              <button className="btn delete" onClick={deleteEvent}>
        Delete
      </button>


    </div>

    {/* EVENT CONTENT */}
    <div className="event-card">
      <h2>{event.title}</h2>
      <p className="desc">{event.description}</p>

      <p>
        <strong>Start:</strong>{" "}
        {event.event_start_datetime
          ? new Date(event.event_start_datetime).toLocaleString()
          : "N/A"}
      </p>

      <p>
        <strong>End:</strong>{" "}
        {event.event_end_datetime
          ? new Date(event.event_end_datetime).toLocaleString()
          : "N/A"}
      </p>

      <p>
        <strong>Participants:</strong> {event.no_of_participants_allowed}
      </p>
    </div>
  </div>
  </div>
  </>
);
}