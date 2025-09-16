import SideBarClassroom from '#components/Classroom/SideBarClassroom/SideBarClassroom.jsx'
import ForumClass from '#components/Classroom/ForumClass/ForumClass.jsx'
import ManagementStudent from '#components/Classroom/ManageStudent/ManageStudent.jsx'
import ProcessRoadmap from '#components/Classroom/ProcessRoadmap/ProcessRoadmap.jsx'
import RoadmapClassroom from '#components/Classroom/RoadmapClassroom/RoadmapClassroom.jsx'
import { useParams,useNavigate,useLocation } from "react-router-dom";
import api from '#utils/api.js'
import './ClassroomView.css'
import { useState,useEffect } from 'react'
export default function ClassroomView(){
    const navigate = useNavigate();
    const { name,classroomId } = useParams();
    const location = useLocation();
    const forum = <ForumClass classroomId = {classroomId}/>;
    const students = <ManagementStudent classroomId = {classroomId}/>;
    const roadmap = <RoadmapClassroom/>;
    const process = <ProcessRoadmap/>;
    const [activeNav, setActiveNav] = useState('Forum');
    const [mainContent, setMainContent] = useState(forum);
    const handleNavClick = (navId) => {
            setActiveNav(navId);
            if (navId === 'Forum') {setMainContent(forum);}
            else if (navId === 'Roadmap') {setMainContent(roadmap);}
            else if (navId === 'Student') {setMainContent(students);}
            else if (navId === 'Process') {setMainContent(process);}
    };
    const navItems = [
        { id: 'Forum', label: 'Forum', icon: '👤' },
        { id: 'Roadmap', label: 'Roadmap', icon: '👥' },
        { id: 'Student', label: 'Manage students', icon: '🗺️' },
        { id: 'Process', label: 'Student Process', icon: '⚙️' }
    ];
    const [classes, setClassess] = useState([name]);
    const [selectedClass, setSelectedClass] = useState(name);
    useEffect( ()=>{
          async function checkLogin(){
            const response = await api.post('/classrooms/check-your-classroom',{name:name},{
              withCredentials: true
            }) ;
            // console.log(response)
            if(!response.data.success){
            navigate("/");
            }
          }
          checkLogin()
         
        },[])
    useEffect(() => {
        const getClasses = async () =>{
                const response = await api.get('/classrooms/getNameAll', {
                    withCredentials: true
                });
                console.log(response)
                setClassess([...response.data.map(classItem => classItem.name)]);
                } 
        getClasses();
    }, []);
    // useEffect(() => {
    //         if(selectedTeam === 'your account') {
    //             navigate('/profile');
    //         }
    //         else{
    //             navigate(`/team/${selectedTeam}`);
    //         }
    // }, [selectedTeam]);
    return(<>
     <div className="profile-container">
            <SideBarClassroom activeNav={activeNav}navItems={navItems} handleNavClick = {handleNavClick} selectedClass = {selectedClass} setSelectedClass={setSelectedClass} classes={classes}/>
            <div className="main-content">
                {mainContent}
            </div>
     </div>

    </>)
}