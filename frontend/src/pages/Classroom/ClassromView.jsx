import SideBarClassroom from '#components/Classroom/SideBarClassroom/SideBarClassroom.jsx'
import ForumClass from '#components/Classroom/ForumClass/ForumClass.jsx'
import ManagementStudent from '#components/Classroom/ManageStudent/ManageStudent.jsx'
import ProcessClassroom from '#components/Classroom/ProcessClassroom/ProcessClassroom.jsx'
import RoadmapClassroom from '#components/Classroom/RoadmapClassroom/RoadmapClassroom.jsx'
import { useParams,useNavigate,useLocation } from "react-router-dom";
import api from '#utils/api.js'
import './ClassroomView.css'
import { useState,useEffect } from 'react'
export default function ClassroomView(){
    const navigate = useNavigate();
    const { name,classroomId } = useParams();
    const location = useLocation();
    const [classes, setClassess] = useState([{name:name,id:classroomId}]);
    const [selectedClass, setSelectedClass] = useState({name:name,id:classroomId});
    const [activeNav, setActiveNav] = useState('Forum');
    const renderContent = () => {
    switch (activeNav) {
      case "Forum": return <ForumClass classroomId={classroomId} key={classroomId} />;
      case "Roadmap": return <RoadmapClassroom classroomId={classroomId}  key={classroomId}/>;
      case "Student": return <ManagementStudent classroomId={classroomId}  key={classroomId}/>;
      case "Process": return <ProcessClassroom  key={classroomId}/>;
      default: return null;
    }
  };
    const navItems = [
        { id: 'Forum', label: 'Forum', icon: '👤' },
        { id: 'Roadmap', label: 'Roadmap', icon: '👥' },
        { id: 'Student', label: 'Manage students', icon: '🗺️' },
        { id: 'Process', label: 'Student Process', icon: '⚙️' }
    ];
    
    useEffect( ()=>{
          async function checkLogin(){
            const response = await api.post('/classrooms/check-your-classroom',{name:name},{
              withCredentials: true
            }) ;
            // //console.log(response)
            if(!response.data.success){
            navigate("/");
            }
          }
          checkLogin()
         
        },[name, location.pathname])
    useEffect(() => {
        const getClasses = async () =>{
                const response = await api.get('/classrooms/getNameAll', {
                    withCredentials: true
                });
                //console.log(response)
                setClassess([...response.data.map(classItem => ({name:classItem.name,id:classItem.id}))]);
                } 
        getClasses();
    }, [location.pathname]);
    useEffect(() => {
           navigate(`/classroom/view/${selectedClass.name}/${selectedClass.id}`);
    }, [selectedClass]);
    return(<>
     <div className="profile-container">
            <SideBarClassroom activeNav={activeNav}navItems={navItems} handleNavClick = {setActiveNav} selectedClass = {selectedClass} setSelectedClass={setSelectedClass} classes={classes}/>
            <div className="main-content">
                {renderContent()}
                
            </div>
     </div>

    </>)
}