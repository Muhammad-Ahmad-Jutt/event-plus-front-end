import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // ✅ fixed path

export default function CreateEventForm() {
  const { token } = useContext(AuthContext); // ✅ works now

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_start_datetime: "",
    event_end_datetime: "",
    no_of_participants_allowed: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ useEffect example: check token or log mount
  useEffect(() => {
    if (!token) {
      setMessage("⚠️ You must be logged in to create an event.");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
        `${process.env.REACT_APP_BACKEND_URL}/api/events/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔐 Auth header
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
        throw new Error(data.message || "Failed to create event");
      }

      setMessage("✅ Event created successfully!");

      // reset form
      setFormData({
        title: "",
        description: "",
        event_start_datetime: "",
        event_end_datetime: "",
        no_of_participants_allowed: "",
      });

    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Create Event</h2>

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

        <button type="submit" disabled={loading || !token}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}