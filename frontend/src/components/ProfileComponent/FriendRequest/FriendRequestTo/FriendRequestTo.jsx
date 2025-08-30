import React from "react";
import "./FriendRequestTo.css";

export default function FriendRequestTo({ requests, onAccept, onReject }) {
  return (
    <div className="card">
      <h2>Friend Requests To You</h2>
      {requests.length === 0 && <p className="empty">No requests</p>}
      {requests.map((req) => (
        <div key={req.id} className="request-item">
          <div>
            <p className="email">From: {req.senderEmail}</p>
            <small>{new Date(req.createAt).toLocaleString()}</small>
          </div>
          <div className="actions">
            <button className="btn accept" onClick={() => onAccept(req.id)}>
              Accept
            </button>
            <button className="btn reject" onClick={() => onReject(req.id)}>
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
