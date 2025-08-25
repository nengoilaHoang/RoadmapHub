import React, { useState } from "react";
import "./FriendsComponent.css";

const FRIENDS_DATA = [
  {
    name: "Mai Duc Kien",
    email: "kientri098@gmail.com",
    avatar: "https://i.imgur.com/ExdKOOz.png"
  },
  {
    name: "Nguyen Van A",
    email: "nguyenvana@gmail.com",
    avatar: "https://i.imgur.com/ExdKOOz.png"
  }
];

// Card trạng thái bạn bè
const FriendCard = ({ friend, type, status, onAccept, onReject, onRemove, onUndoReject, onConfirmRemove, onCancelRemove }) => {
  if (type === "request") {
    if (status === "pending") {
      return (
        <div className="friend-card">
          <div className="friend-card-header">
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <div>
              <div className="friend-name">{friend.name}</div>
              <div className="friend-email">{friend.email}</div>
            </div>
          </div>
          <div className="friend-card-icon blue">{/* icon user check */}
            <span role="img">👤✔️</span>
          </div>
          <button className="friend-card-accept" onClick={onAccept}>Accept</button>
          <button className="friend-card-reject" onClick={onReject}>Reject</button>
        </div>
      );
    } else if (status === "rejected") {
      return (
        <div className="friend-card">
          <div className="friend-card-header">
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <div>
              <div className="friend-name">{friend.name}</div>
              <div className="friend-email">{friend.email}</div>
            </div>
          </div>
          <div className="friend-card-icon red">{/* icon user cross */}
            <span role="img">👤❌</span>
          </div>
          <div className="friend-card-text red">Request Rejected</div>
          <div className="friend-card-text">
            Changed your mind? <span className="friend-card-accept-link" onClick={onUndoReject}>Accept</span>
          </div>
        </div>
      );
    }
  }
  if (type === "manage") {
    if (status === "friend") {
      return (
        <div className="friend-card">
          <div className="friend-card-header">
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <div>
              <div className="friend-name">{friend.name}</div>
              <div className="friend-email">{friend.email}</div>
            </div>
          </div>
          <div className="friend-card-remove" onClick={onRemove}>
            <span role="img">🗑️</span> Remove Friend
          </div>
        </div>
      );
    } else if (status === "confirm-remove") {
      return (
        <div className="friend-card">
          <div className="friend-card-header">
            <img src={friend.avatar} alt={friend.name} className="friend-avatar" />
            <div>
              <div className="friend-name">{friend.name}</div>
              <div className="friend-email">{friend.email}</div>
            </div>
          </div>
          <div className="friend-card-text red">
            Are you sure? <span className="friend-card-confirm-link" onClick={onConfirmRemove}>Yes</span> <span className="friend-card-confirm-link" onClick={onCancelRemove}>No</span>
          </div>
        </div>
      );
    }
  }
  return null;
};

const InviteFriendTab = () => {
  const [copied, setCopied] = useState(false);
  const inviteUrl = "https://roadmap.sh/befriend?u=688e2a2a087fc98";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="invite-url-box">
      <div className="invite-url-title">Invite URL</div>
      <div className="invite-url-desc">
        Share the link below with your friends to invite them.
      </div>
      <input
        type="text"
        className="invite-url-input"
        value={inviteUrl}
        readOnly
        onFocus={e => e.target.select()}
      />
      <button
        className={`invite-url-btn${copied ? " copied" : ""}`}
        type="button"
        onClick={handleCopy}
      >
        {copied ? "URL Copied" : "Copy Link"}
      </button>
    </div>
  );
};

const FriendsContent = () => {
  const [tab, setTab] = useState("Sent");
  const [requestStatus, setRequestStatus] = useState("pending");
  const [manageStatus, setManageStatus] = useState("friend");

  return (
    <div className="friends-content-wrapper">
      <div className="friends-tab-row">
        <button className={`friends-tab-btn${tab==="Manage" ? " active" : ""}`} onClick={() => setTab("Manage")}>Manage</button>
        <button className={`friends-tab-btn${tab==="Request" ? " active" : ""}`} onClick={() => setTab("Request")}>Request</button>
        <button className={`friends-tab-btn${tab==="Sent" ? " active" : ""}`} onClick={() => setTab("Sent")}>Sent</button>
        <button className={`friends-tab-btn invite${tab==="Invite" ? " active" : ""}`} onClick={() => setTab("Invite")}>
          <span role="img" aria-label="invite">👥</span> Invite Friends
        </button>
      </div>
      <div className="friends-content-main">
        {tab === "Sent" && (
          <div className="friends-empty">
            <div className="friends-empty-icon">
              <span role="img" style={{fontSize:40}}>👤</span>
            </div>
            <div className="friends-empty-title">No requests sent</div>
            <div className="friends-empty-desc">Invite your friends to join you on Roadmap</div>
            <button className="friends-empty-invite" onClick={() => setTab("Invite")}>
              <span role="img" aria-label="invite">👥</span> Invite Friends
            </button>
          </div>
        )}
        {tab === "Request" && (
          <div className="friends-card-list">
            <FriendCard
              friend={FRIENDS_DATA[0]}
              type="request"
              status={requestStatus}
              onAccept={() => setRequestStatus(null)}
              onReject={() => setRequestStatus("rejected")}
              onUndoReject={() => setRequestStatus("pending")}
            />
            {requestStatus === "rejected" && (
              <FriendCard
                friend={FRIENDS_DATA[0]}
                type="request"
                status="rejected"
                onUndoReject={() => setRequestStatus("pending")}
              />
            )}
          </div>
        )}
        {tab === "Manage" && (
          <div className="friends-card-list">
            <FriendCard
              friend={FRIENDS_DATA[0]}
              type="manage"
              status={manageStatus}
              onRemove={() => setManageStatus("confirm-remove")}
            />
            {manageStatus === "confirm-remove" && (
              <FriendCard
                friend={FRIENDS_DATA[0]}
                type="manage"
                status="confirm-remove"
                onConfirmRemove={() => setManageStatus("friend")}
                onCancelRemove={() => setManageStatus("friend")}
              />
            )}
          </div>
        )}
        {tab === "Invite" && (
          <InviteFriendTab />
        )}
      </div>
    </div>
  );
};

export default FriendsContent;
