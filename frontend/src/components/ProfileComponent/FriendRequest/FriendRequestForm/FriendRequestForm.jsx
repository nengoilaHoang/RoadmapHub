import React, { useState } from "react";
import "./FriendRequestForm.css";

export default function FriendRequestForm({ onSend }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    onSend(email);
    setEmail("");
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Send Friend Request</h2>
      <input
        type="email"
        placeholder="Enter email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input"
        required
      />
      <button type="submit" className="btn send">Send</button>
    </form>
  );
}
