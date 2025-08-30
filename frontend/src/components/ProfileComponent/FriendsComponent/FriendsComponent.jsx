import React, { useState } from "react";
import "./FriendsComponent.css";
import FriendRequestTo from "../FriendRequest/FriendRequestTo/FriendRequestTo";
import FriendRequestFrom from "../FriendRequest/FriendRequestFrom/FriendRequestFrom";
import FriendRequestForm from "../FriendRequest/FriendRequestForm/FriendRequestForm";

const FriendsContent = () => {
  const [tab, setTab] = useState("Sent");
  const [requestsTo, setRequestsTo] = useState();
  const [requestsFrom, setRequestsFrom] = useState();
  
  return (
    <div className="friends-content-wrapper">
      <div className="friends-tab-row">
        <button className={`friends-tab-btn${tab==="Manage" ? " active" : ""}`} onClick={() => setTab("Manage")}>Manage</button>
        <button className={`friends-tab-btn${tab==="Request" ? " active" : ""}`} onClick={() => setTab("Request")}>Request</button>
        <button className={`friends-tab-btn${tab==="Sent" ? " active" : ""}`} onClick={() => setTab("Sent")}>Sent</button>
      </div>
      <div className="friends-content-main">
        {tab === "Sent" && (
          <div>
            <FriendRequestForm/>
          </div>
        )}
        {tab === "Request" && (
          <div>
            <FriendRequestTo requests={requestsTo} />
          </div>
        )}
        {tab === "Manage" && (
          <div>
            <FriendRequestFrom requests={requestsFrom} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsContent;
