import React,{useState, useEffect} from "react";
import "./FriendRequestTo.css";
import axios from "axios";

export default function FriendRequestTo({ onAccept, onReject }) {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/friends/friend-requests/to", {
          withCredentials: true
        });
        console.log(response.data.data);
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="card">
      <h2>Friend Requests To You</h2>
      {requests?.length === 0 && <p className="empty">No requests</p>}
      {requests?.map((req) => (
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
