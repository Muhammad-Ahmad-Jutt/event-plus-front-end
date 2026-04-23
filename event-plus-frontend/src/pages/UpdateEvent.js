import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import bg from "../images/event-plus-bg.png";

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

            .container {
            background: #FAF9F6;
            width: 100%;
            max-width: 940px;
            height: 630px;
            border-radius: 12px;
            border-width: 2px;
            border-color: black;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 24px;
            margin-top: 20px;
            }

            .title {
            margin: 0;
            font-size: 20px;
            font-weight: 600;
            }

            .topheaderview {
            background: #FFEEE7;
            border-radius: 10px;
            display: flex;
            align-items: center;
            width: 100%;
            height: 60px;
            padding: 20px;
            }

            .sectionTitle {
            font-weight: 800;
            font-size: 20px;
            margin: 0;
            text-align: center;
            color: red;
            }

            .headerBox {
             margin-bottom: 25px;
            }

            .inputBox {
            border-color: black;
            border-width: 1px;
            width: 300px;
            height: 50px;
            margin-right: 15px;
            border-radius: 10px;
            padding: 10px;
            }

          .eventForm {
            display: flex;
            flex-direction: column;
            gap: 16px; /* spacing between fields */
            padding: 24px;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          }

          .eventForm input,
          .eventForm textarea {
            width: 100%;
            padding: 12px 14px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s ease;
          }

          .eventForm input:focus,
          .eventForm textarea:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
          }

          .eventForm textarea {
            min-height: 100px;
            resize: vertical;
          }

          .btnPrimary {
            background: #00BA46;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            height: 40px;
          }

          .btnPrimary:hover {
            background: #006400;
          }

          .btnPrimary:disabled {
            background: #aaa;
            cursor: not-allowed;
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
    <div className="container">
    
      <div className="headerBox">
          <div className="topheaderview">
            <h1 className="sectionTitle">Update Event</h1>
          </div>
      </div>

      <form onSubmit={handleSubmit} className="eventForm">
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

        <button type="submit" disabled={loading} className="btnPrimary">
          {loading ? "Updating..." : "Update Event"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
    </div>
    </>
  );
}