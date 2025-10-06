import React, { useState } from 'react';
import api from '#utils/api.js'
import { useNavigate } from 'react-router-dom';
import AlertError from '#components/SignUp/AlertError.jsx';
export default function CreateClassroom(props){
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const { onClose ,user} = props;
    const navigate = useNavigate();
    const onhandleSubmit = async (e) => {
        e.preventDefault();
        const response = await api.post('/classrooms/create', { name:name, description:description, accountId:user.id });
        //console.log("pp",response.data.classroomId)
        
        if(response.data.success){
            navigate(`/classroom/view/${name}/${response.data.classroomId}`)
            onClose();
        }
        else {
            setError(response.data.message);
        }
       
    }
    return(<>
    <div className="popup-overlay">
        <div className="popup-content">
            <button className="close-button" onClick={onClose}>&times;</button>
            
            <div className="popup-header">
                <h2 className="popup-title">Create Classroom</h2>
            </div>
            <p className="popup-subtitle">Add a name and description to your classroom.</p>
    
            <form onSubmit={onhandleSubmit}>
                <div className="form-group">
                    <label className="form-label">NAME CLASSROOM</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Name"
                        onChange={(e)=>setName(e.target.value)}
                    />
                </div>
                {error && <AlertError content={error}/>}
                <div className="form-group">
                    <label className="form-label">DESCRIPTION CLASSROOM</label>
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
        </div>
    </>)

}