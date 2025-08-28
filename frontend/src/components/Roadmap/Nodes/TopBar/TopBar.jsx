import { useState } from "react";
import "./TopBar.css"; 
import CreateRoadmap from "#components/Roadmap/CreateRoadmap/CreateRoadmap";
export default function TopBar(props) {
  const {onSaveNode} = props;
  const [title, setTitle] = useState("Untitled Roadmap");
  const [isEditing, setIsEditing] = useState(false);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div className="topbar">
      
        <div className="topbar-left">
        {isEditing ? (
          <CreateRoadmap onClose={()=>setIsEditing(false)}/>
        ) : (
          <>
            <strong onClick={handleTitleClick}>{title}</strong>
            <button className="edit-btn" onClick={handleTitleClick}>
              <i className="bi bi-pencil-square"></i>
            </button>
          </>
        )}
      </div>

      <div className="topbar-center">
        <div className="dropdown-button">
          <i className="bi bi-globe"></i>
          <span>Anyone can view</span>
          <i className="bi bi-chevron-down"></i>
        </div>
        <button className="view-btn">
          <i className="bi bi-eye"></i>
          <span>Live View</span>
        </button>
      </div>
      <form onSubmit={onSaveNode}>
      <button className="save-btn-topbar-edit-roadmap" onClick={onSaveNode}>
        <i className="bi bi-save"></i>
        <span>Save Roadmap</span>
      </button>
      </form>
      
    </div>
  );
}