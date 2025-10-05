import React, { useState } from 'react';
import api from '#utils/api.js'
import { useNavigate } from 'react-router-dom';
import './CreateRoadmap.css';
import AlertError from '#components/SignUp/AlertError.jsx';
export default function CreateRoadmap(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const { onClose ,user} = props;
    const navigate = useNavigate();
    const onhandleSubmit = async (e) => {
        e.preventDefault();
        // Handle roadmap creation logic here
        const response = await api.post('/roadmaps/create', { name:title, description:description, accountId:user.id });
        //console.log(response)
        
        if(response.data.success){
            navigate(`/roadmap/edit/${title}/${response.data.roadmap.id}`)
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
            <h2 className="popup-title">Create Roadmap</h2>
        </div>
        <p className="popup-subtitle">Add a title and description to your roadmap.</p>

        <form onSubmit={onhandleSubmit}>
            <div className="form-group">
                <label className="form-label">ROADMAP TITLE</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Title"
                    onChange={(e)=>setTitle(e.target.value)}
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
                />
            </div>

            <div className="button-group">
                <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-create" >Create</button>
            </div>
        </form>
    </div>
    </div>)
}