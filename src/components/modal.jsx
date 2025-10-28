import React from "react";
import "../styles/tickets.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-overlay">
      <div className="confirm-modal">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Yes
          </button>
          <button className="cancel-btn" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}
