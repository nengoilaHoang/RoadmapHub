import './ManageStudent.css'
import { useState } from "react";
import AddStudentForm from '#components/Classroom/ManageStudent/AddStudentForm/AddStudentForm.jsx';
import StudentList from '#components/Classroom/ManageStudent/StudentList/StudentList.jsx';
export default function ManageStudent(props){
  const [tab, setTab] = useState("students");
    const {classroomId} = props
    return( <div className="students-content-wrapper">
          <div className="students-tab-row">
            <button className={`students-tab-btn${tab==="students" ? " active" : ""}`} onClick={() => setTab("students")}>students</button>
            <button className={`students-tab-btn${tab==="Sent" ? " active" : ""}`} onClick={() => setTab("Sent")}>Add Student</button>
          </div>
          <div className="students-content-main">
            {tab === "Sent" && (
              <div>
                <AddStudentForm classroomId={classroomId}/>
              </div>
            )}
            {tab === "students" && (
              <div>
                <StudentList classroomId={classroomId}/>
              </div>
            )}
          </div>
        </div>)
}