import React, { useState } from "react";
import "./FriendRequestForm.css";
import axios from "axios";
import api from "../../../../utils/api";

export default function FriendRequestForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const res = await api.post('/friends/friend-requests/send', { receiverEmail: email },{
      withCredentials: true
    });
    //console.log(res.data);
    if (res.data.status === "success") {
      //console.log("Friend request sent");
    }
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
      <button onClick={handleSubmit} className="btn send">Send</button>
    </form>
  );
}
