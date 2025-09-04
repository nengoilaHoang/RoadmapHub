import React, { useState } from "react";
import "./FriendsComponent.css";
import FriendRequestTo from "../FriendRequest/FriendRequestTo/FriendRequestTo";
import FriendRequestFrom from "../FriendRequest/FriendRequestFrom/FriendRequestFrom";
import FriendRequestForm from "../FriendRequest/FriendRequestForm/FriendRequestForm";
import FriendList from "../FriendRequest/FriendList/FriendList";

const FriendsContent = () => {
  const [tab, setTab] = useState("Friends");

  return (
    <div className="friends-content-wrapper">
      <div className="friends-tab-row">
        <button className={`friends-tab-btn${tab==="Friends" ? " active" : ""}`} onClick={() => setTab("Friends")}>Friends</button>
        <button className={`friends-tab-btn${tab==="Manage" ? " active" : ""}`} onClick={() => setTab("Manage")}>Your requests</button>
        <button className={`friends-tab-btn${tab==="Request" ? " active" : ""}`} onClick={() => setTab("Request")}>Request</button>
        <button className={`friends-tab-btn${tab==="Sent" ? " active" : ""}`} onClick={() => setTab("Sent")}>Add Friend</button>
      </div>
      <div className="friends-content-main">
        {tab === "Sent" && (
          <div>
            <FriendRequestForm/>
          </div>
        )}
        {tab === "Request" && (
          <div>
            <FriendRequestTo/>
          </div>
        )}
        {tab === "Manage" && (
          <div>
            <FriendRequestFrom/>
          </div>
        )}
        {tab === "Friends" && (
          <div>
            <FriendList/>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsContent;
