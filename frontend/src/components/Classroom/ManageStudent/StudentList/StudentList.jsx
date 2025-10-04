import React,{useState, useEffect} from "react";
import api from '../../../../utils/api.js'
import './StudentList.css'
export default function StudentList(props){
    const{classroomId} = props;
    const [students, setStudents] = useState([]);
     const getStudent = async () => {
        try {
            const response = await api.get("/studentclassrooms/student-list",{
                withCredentials: true,
                params:{classroomId:classroomId}});
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students requests:", error);
        }
        };
    useEffect(() => {
       
        getStudent();
    }, []);

    const onRemove = async(id)=>{
        await api.delete("/studentclassrooms/remove",{
            data:{classroomId:classroomId,studentId:id},
            withCredentials: true
        });
         getStudent();
    }
    return(

    <div className="card">
        <h2>List students</h2>
        {students?.length === 0 && <p className="empty">No have students</p>}
        {students?.map(students => (
            <div key={students.id} className="request-item">
            <div>
                <p className="email">{students.fullname}</p>
            </div>
            <div className="actions">
                <button className="btn remove" onClick={() => onRemove(students.accountId)}>
                Remove
                </button>
            </div>
            </div>
        ))}
    </div>
    );
}