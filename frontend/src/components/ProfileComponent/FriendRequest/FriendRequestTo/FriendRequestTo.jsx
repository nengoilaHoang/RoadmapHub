import React,{useState, useEffect} from "react";
import "./FriendRequestTo.css";
import axios from "axios";
import api from "../../../../utils/api";

export default function FriendRequestTo() {
  const [requests, setRequests] = useState([]);
  const fetchRequests = async () => {
    try {
      const response = await api.get("/friends/friend-requests/to", {
        withCredentials: true
      });
      //console.log(response.data.data);
      setRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  const onAccept = async (id) =>{
    //console.log("hí")
    await api.post("/friends/friend-requests/to/accept",{id}, {
      withCredentials: true
    });
    fetchRequests();
  }
  const onReject = async (id) =>{
    //console.log("hí")
    await api.post("/friends/friend-requests/to/reject",{id}, {
      withCredentials: true
    });
    fetchRequests();
  }
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
