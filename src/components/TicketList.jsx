// TicketList.jsx
import React, { useState } from "react";
import "../styles/tickets.css";

const statusColors = {
  open: "green",
  in_progress: "orange",
  closed: "gray",
};

export default function TicketList({ tickets, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // filter tickets
  const filtered = tickets.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesPriority =
      priorityFilter === "All" || t.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || t.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="ticket-list-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="no-tickets">No tickets found</p>
      ) : (
        <div className="ticket-grid">
          {filtered.map((t) => (
            <div className="ticket-card" key={t.id}>
              <div className="ticket-card-header">
                <h3>{t.name}</h3>

                <div className="tags">
                  <p className={`priority ${t.priority.toLowerCase()}`}>
                    {t.priority}
                  </p>
                  <span
                    className="status"
                    style={{ backgroundColor: statusColors[t.status] }}
                  >
                    {t.status}
                  </span>
                </div>
              </div>

              <p className="desc">{t.description}</p>

              <div className="ticket-bottom">
                <p>
                  <strong>Due:</strong> {t.dueDate}
                </p>
              </div>
              <div className="actions">
                <button onClick={() => onEdit(t)}>edit</button>
                <button className="del" onClick={() => onDelete(t.id)}>delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
