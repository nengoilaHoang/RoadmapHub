import React from "react";
import "./RightBar.css";

export default function RightBar({ selectedNode, onDeleteNode }) {
  if (!selectedNode) {
    return (
      <div className="rightbar">
        <h3 className="rightbar-title">Right Panel</h3>
        <p>Chọn một node để xem chi tiết...</p>
      </div>
    );
  }

  return (
    <div className="rightbar">
      <h3 className="rightbar-title">Chi tiết Node</h3>
      <div className="rightbar-content">
        <p><b>ID:</b> {selectedNode.id}</p>
        <p><b>Type:</b> {selectedNode.type || "default"}</p>
        <p><b>Label:</b> {selectedNode.data?.label}</p>
      </div>
      <button className="delete-btn" onClick={() => onDeleteNode(selectedNode.id)}>
        Xóa Node
      </button>
    </div>
  );
}
