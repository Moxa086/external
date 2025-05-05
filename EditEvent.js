import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({ title: "", description: "", date: "", type: "" });

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await axios.get(`/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEvent(data);
    };
    fetchEvent();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/events/${id}`, event, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Event Updated!");
      navigate("/events");
    } catch (error) {
      alert("Error updating event");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Event</h2>
      <input
        type="text"
        placeholder="Title"
        value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })}
      />
      <textarea
        placeholder="Description"
        value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })}
      />
      <input
        type="date"
        value={event.date}
        onChange={(e) => setEvent({ ...event, date: e.target.value })}
      />
      <select
        value={event.type}
        onChange={(e) => setEvent({ ...event, type: e.target.value })}
      >
        <option value="Workshop">Workshop</option>
        <option value="Sports">Sports</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditEvent;