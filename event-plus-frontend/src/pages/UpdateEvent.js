import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UpdateEventForm() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_start_datetime: "",
    event_end_datetime: "",
    no_of_participants_allowed: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch existing event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch event");
        }

        const event = data.event;

        setFormData({
          title: event.title || "",
          description: event.description || "",
          event_start_datetime: event.event_start_datetime
            ? event.event_start_datetime.slice(0, 16) // ✅ important for input
            : "",
          event_end_datetime: event.event_end_datetime
            ? event.event_end_datetime.slice(0, 16)
            : "",
          no_of_participants_allowed:
            event.no_of_participants_allowed || "",
        });
      } catch (err) {
        setMessage(`❌ ${err.message}`);
      }
    };

    if (id && token) fetchEvent();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setMessage("❌ No authentication token found.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/events/update_event/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            no_of_participants_allowed: Number(
              formData.no_of_participants_allowed
            ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update event");
      }

      setMessage("✅ Event updated successfully!");

      // ✅ Redirect after update
      setTimeout(() => {
        navigate(`/event/${id}`);
      }, 1000);

    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Update Event</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="event_start_datetime"
          value={formData.event_start_datetime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="event_end_datetime"
          value={formData.event_end_datetime}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="no_of_participants_allowed"
          placeholder="Participants"
          value={formData.no_of_participants_allowed}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}