import React, { useState ,useEffect, use} from 'react';
import api from '#utils/api.js'
import { useNavigate } from 'react-router-dom';
import './UpdateRoadmap.css';
import AlertError from '#components/SignUp/AlertError.jsx';
export default function UpdateRoadmap(props) {
    const { onClose ,user,nameRoadmap} = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState( '');
    const [error, setError] = useState('');
    const [roadmapId, setRoadmapId] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const response  = await api.get(`/roadmaps/edit/${nameRoadmap}`,{params:{accountId:user.id}});
            setTitle(response.data.name);
            setDescription(response.data.description);
            setRoadmapId(response.data.id);
        }
        fetchData();
        
    }, []);
   
    const onhandleSubmit = async (e) => {
        e.preventDefault();
        // Handle roadmap creation logic here
        const response = await api.post(`/roadmaps/edit/${nameRoadmap}`, { name:title, description:description, accountId:user.id, roadmapId: roadmapId });
        //console.log(response)
        
        if(response.data.success){
            navigate(`/roadmap/edit/${title}`)
            onClose();
        }
        else {
            setError(response.data.message);
        }
       
    }
    
    return (
    <div className="popup-overlay">
    <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="popup-header">
            <h2 className="popup-title">Update Roadmap</h2>
        </div>
        <p className="popup-subtitle">Update a title and description to your roadmap.</p>

        <form onSubmit={onhandleSubmit}>
            <div className="form-group">
                <label className="form-label">ROADMAP TITLE</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Title"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                />
            </div>
            {error && <AlertError content={error}/>}
            <div className="form-group">
                <label className="form-label">DESCRIPTION</label>
                <textarea 
                    className="form-control" 
                    placeholder="Enter Description"
                    maxLength={80}
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                />
            </div>

            <div className="button-group">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-create" >Update</button>
            </div>
        </form>
    </div>
    </div>)
}