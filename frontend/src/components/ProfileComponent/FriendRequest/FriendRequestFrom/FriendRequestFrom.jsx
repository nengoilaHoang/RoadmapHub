import React, {useState,useEffect} from "react";
import "./FriendRequestFrom.css";
import axios from "axios";
import api from "../../../../utils/api";

export default function FriendRequestFrom() {

  const[requests, setRequests] = useState([]);
  const fetchRequests = async () => {
      try {
        const response = await api.get("/friends/friend-requests/from",{
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

  const onCancel = async(id)=>{
    await api.post("/friends/friend-requests/from/cancel",{id},{
      withCredentials: true
    });
    fetchRequests();
  }

  return (
    <div className="card">
      <h2>Requests You Sent</h2>
      {requests?.length === 0 && <p className="empty">No requests</p>}
      {requests?.map((req) => (
        <div key={req.id} className="request-item">
          <div>
            <p className="email">To: {req.receiverEmail}</p>
            <small>{new Date(req.createAt).toLocaleString()}</small>
          </div>
          <div className="actions">
            {req.requestState === "pending" ? (
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
