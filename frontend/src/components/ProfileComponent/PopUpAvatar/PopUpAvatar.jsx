import React, { useState } from "react";
import "./PopUpAvatar.css";
import { useCheckLogin } from "../../../hooks/userCheckLogin";

const PopUpAvatar = ({ show, onClose, onUpload, uploading }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { profile } = useCheckLogin();

  // Sửa tại đây: luôn chọn đúng 1 file
  const handleChange = (e) => {
    setSelectedFile(e.target.files[0]);
    //console.log(e.target.files[0]);
  };
  const handleUploadClick = () => {
    if (selectedFile) onUpload(selectedFile);
  };
  if (!show) return null;

  return (
    <div className="avatar-modal-overlay">
      <div className="avatar-modal">
        <h3 className="avatar-modal-title">Đổi ảnh đại diện</h3>
        <div className="avatar-modal-img-box">
          <label htmlFor="avatar-upload" className="avatar-upload-label">
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : profile.avatar}
              alt="Preview"
              className="avatar-modal-img"
            />
            <div className="avatar-upload-hover">Chọn ảnh</div>
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleChange}
            multiple={false}
            style={{ display: "none" }}
          />
        </div>
        <div className="avatar-modal-buttons">
          <button className="avatar-modal-btn cancel" onClick={onClose}>
            Hủy
          </button>
          <button
            className="avatar-modal-btn upload"
            onClick={handleUploadClick}
            disabled={!selectedFile || uploading}
          >
            {uploading ? "Đang tải..." : "Thay ảnh đại diện"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpAvatar;
