import React from "react";
import "./FriendRequestFrom.css";

export default function FriendRequestFrom({ requests, onCancel }) {
  return (
    <div className="card">
      <h2>Requests You Sent</h2>
      {requests.length === 0 && <p className="empty">No requests</p>}
      {requests.map((req) => (
        <div key={req.id} className="request-item">
          <div>
            <p className="email">To: {req.receiverEmail}</p>
            <small>{new Date(req.createAt).toLocaleString()}</small>
          </div>
          <div className="actions">
            {req.requestState === "Pending" ? (
              <button className="btn cancel" onClick={() => onCancel(req.id)}>
                Cancel
              </button>
            ) : (
              <span className="status">{req.requestState}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
