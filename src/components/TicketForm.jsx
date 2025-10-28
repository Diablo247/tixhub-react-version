import React, { useState, useEffect } from "react";
import "../styles/tickets.css";

export default function TicketForm({ existing, onSave, onCancel }) {
  const [ticket, setTicket] = useState(
    existing || {
      name: "",
      description: "",
      priority: "Low",
      status: "open",
      dueDate: "",
    }
  );

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (existing) setTicket(existing);
  }, [existing]);

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!ticket.name.trim()) newErrors.name = "Title is required";
    if (!ticket.description.trim())
      newErrors.description = "Description is required";
    if (!ticket.dueDate) newErrors.dueDate = "Due date is required";

    // stop submit if any validation fails
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave(ticket);
    onCancel();
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <h2>{ticket.id ? "Edit Ticket" : "Create Ticket"}</h2>

      <div className="form-group">
        <label htmlFor="name">Title</label>
        <input
          type="text"
          name="name"
          value={ticket.name}
          placeholder="Enter title"
          onChange={handleChange}
          className={`input name ${errors.name ? "error" : ""}`}
        />
        {errors.name && <p className="error-msg">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={ticket.description}
          placeholder="Enter description"
          onChange={handleChange}
          className={`input desc ${errors.description ? "error" : ""}`}
        />
        {errors.description && (
          <p className="error-msg">{errors.description}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          className="input priority"
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          className="input status"
          name="status"
          value={ticket.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="duedate">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={ticket.dueDate}
          onChange={handleChange}
          className={`input date ${errors.dueDate ? "error" : ""}`}
        />
        {errors.dueDate && <p className="error-msg">{errors.dueDate}</p>}
      </div>

      <div className="actions">
        <button type="submit">Save</button>
        <button className="cancel" type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
