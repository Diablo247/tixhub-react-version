import React, { useState, useEffect } from "react";
import TicketList from "../components/TicketList";
import TicketForm from "../components/TicketForm";
import ConfirmModal from "../components/modal"; // ✅ add this
import "../styles/tickets.css";

const TicketManager = () => {
  const [tickets, setTickets] = useState([]);
  const [editingTicket, setEditingTicket] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // ✅ track which ticket to delete

  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  const userEmail = session?.user?.email;

  if (!userEmail) {
    window.location.href = "/login";
    return null;
  }

  const ticketsKey = `ticketapp_tickets_${userEmail}`;

  useEffect(() => {
    if (!userEmail) return;
    const stored = localStorage.getItem(ticketsKey);
    if (stored) {
      try {
        setTickets(JSON.parse(stored));
      } catch {
        setTickets([]);
      }
    } else {
      setTickets([]);
    }
    setIsLoaded(true);
  }, [userEmail]);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem(ticketsKey, JSON.stringify(tickets));
  }, [tickets, isLoaded, ticketsKey]);

  const handleSave = (ticket) => {
    const updatedTickets = ticket.id
      ? tickets.map((t) => (t.id === ticket.id ? ticket : t))
      : [
          ...tickets,
          { ...ticket, id: Date.now(), createdAt: new Date().toISOString() },
        ];
    setTickets(updatedTickets);
    setEditingTicket(null);
  };

  // ✅ Show modal instead of confirm
  const handleDeleteClick = (id) => setDeleteId(id);

  const confirmDelete = () => {
    setTickets(tickets.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => setDeleteId(null);

  return (
    <div className="ticket-manager">
      {editingTicket ? (
        <TicketForm
          existing={editingTicket}
          onSave={handleSave}
          onCancel={() => setEditingTicket(null)}
        />
      ) : (
        <>
          <div className="ticket-header">
            <h2>My Tickets</h2>
            <button
              className="add-btn"
              onClick={() =>
                setEditingTicket({
                  name: "",
                  description: "",
                  priority: "Low",
                  status: "open",
                  dueDate: "",
                })
              }
            >
              + Add Ticket
            </button>
          </div>

          <TicketList
            tickets={tickets}
            onEdit={setEditingTicket}
            onDelete={handleDeleteClick} // ✅ use modal
          />

          {deleteId && (
            <ConfirmModal
              message="Are you sure you want to delete this ticket?"
              onConfirm={confirmDelete}
              onCancel={cancelDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default TicketManager;
