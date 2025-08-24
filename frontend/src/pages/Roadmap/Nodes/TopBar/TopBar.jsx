import { useState } from "react";
import "./TopBar.css"; 

export default function TopBar() {
  const [title, setTitle] = useState("Untitled Roadmap");

  return (
    <div className="topbar">
      {/* Left: Title */}
      <div className="topbar-left">
        <strong>{title}</strong>
        <button
          className="edit-btn"
          onClick={() => setTitle(prompt("Enter new title:", title) || title)}
        >
          ✏️
        </button>
      </div>

      {/* Center: Actions */}
      <div className="topbar-center">
        <span>🌍 Anyone can view ▾</span>
        <span>👀 Live View</span>
      </div>

      {/* Right: Save */}
      <button className="save-btn">💾 Save Roadmap</button>
    </div>
  );
}
