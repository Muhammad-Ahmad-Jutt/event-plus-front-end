import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setEvent(data.event); // ✅ FIX HERE
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) fetchEvent();
  }, [id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!event) return <p>No event found</p>;

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>

      <p>
        Start:{" "}
        {event.event_start_datetime
          ? new Date(event.event_start_datetime).toLocaleString()
          : "N/A"}
      </p>

      <p>
        End:{" "}
        {event.event_end_datetime
          ? new Date(event.event_end_datetime).toLocaleString()
          : "N/A"}
      </p>

      <p>Participants: {event.no_of_participants_allowed}</p>
    </div>
  );
}