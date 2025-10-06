import { useEffect, useState } from "react";
import "./TopBar.css"; 
import UpdateRoadmap from "#components/Roadmap/UpdateRoadmap/UpdateRoadmap.jsx";
import {useCheckLogin} from '#hooks/userCheckLogin.jsx';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api.js";
export default function TopBar(props) {
  const {onSaveNode} = props;
  const { name } = useParams();
  const [title, setTitle] = useState("Untitled Roadmap");
  const [isEditing, setIsEditing] = useState(false);
  const { isLoggedIn, user } = useCheckLogin();
  const navigate = useNavigate();
  useEffect(() => {
    if (name) {
      setTitle(name);
    }
  }, [name]);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  const liveViewClick = async() =>{
    const roadmap = await api.get(`/roadmaps/getYourRoadmap/${name}`,{
        withCredentials: true
    })
    //console.log("this is your roadmap id: ",roadmap.id)
    if(roadmap.data?.id)
      navigate(`/roadmap/view/${roadmap.data.id}`,{state:roadmap.data});
  }

  return (
    <div className="topbar">
      
        <div className="topbar-left">
        {isEditing ? (
          <UpdateRoadmap onClose={()=>setIsEditing(false)} user={user} nameRoadmap ={title}/>
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
          <span onClick={liveViewClick}>Live View</span>
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