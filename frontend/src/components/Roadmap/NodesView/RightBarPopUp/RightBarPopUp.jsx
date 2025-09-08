import React from "react";
import "./RightBarPopUp.css";

export default function ModalPopup({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="modal-overlay right-half" onClick={onClose}>
        <div className="modal-box right" onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
  );
}
