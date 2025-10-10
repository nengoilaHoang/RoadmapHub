import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CreateRoadmap from "#components/Roadmap/CreateRoadmap/CreateRoadmap.jsx";
import "./Home.css";
import { useState, useEffect } from "react";
import { useCheckLogin } from "#hooks/userCheckLogin.jsx";
import RoadmapCardInHome from "#components/RoadmapView/RoadmapCardInHome/RoadmapCardInHome.jsx";
import CreateClassroom from "#components/Classroom/CreateClassroom/CreateClassroom";
import api from "#utils/api.js";

export default function Home() {
  const [openCreateRoadmap, setOpenCreateRoadmap] = React.useState(false);
  const [openCreateClassroom, setOpenCreateClassroom] = useState(false);
  const onCreateRoadmap = () => {
    setOpenCreateRoadmap(true);
  };
  const onCreateClassroom = () => {
    setOpenCreateClassroom(true);
  };
  const [listLearningClass, setListLearningClass] = useState([]);
  const [listTeachingClass, setListTeachingClass] = useState([]);
  const [myRoadmaps, setMyRoadmaps] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useCheckLogin();
  useEffect(() => {
    const learningClass = async () => {
      const response = await api.get("/classrooms/getLearningClass", {
        withCredentials: true,
      });
      //console.log(response.data);
      setListLearningClass(response.data);
    };
    const teachingClass = async () => {
      const response = await api.get("/classrooms/getTeachingClass", {
        withCredentials: true,
      });
      setListTeachingClass(response.data);
    };
    const myRoadmap = async () => {
      const response = await api.get("/roadmaps/getRoadmapByUserId", {
        withCredentials: true,
      });
      setMyRoadmaps(response.data.data);
    };
    learningClass();
    teachingClass();
    myRoadmap();
  }, [isLoggedIn]);
  const ViewPageRoadmap = (roadmap) => {
    navigate(`/roadmap/view/${roadmap.id}`, { state: roadmap });
  };

  const handleBookmarkToggle = (id, isBookmarked) => {
    //console.log(`Card ${id} bookmarked: ${isBookmarked}`);
    // Handle bookmark logic here
  };

  // Sample data for different sections (with added `author` field)
  const markedRoadmaps = [
    {
      id: 1,
      name: "Learn Cooking",
      description: "Master the art of cooking",
      author: "Alice Nguyen",
      learning: 12500,
      teaching: 45,
      isMarked: true,
      isUserCard: true,
    },
    {
      id: 2,
      name: "Learn Drawing",
      description: "Creative art techniques",
      author: "Minh Tran",
      learning: 8300,
      teaching: 23,
      isMarked: true,
      isUserCard: true,
    },
  ];

  const customRoadmaps = [
    {
      id: 3,
      name: "For Newbie in Gym",
      description: "Complete beginner's guide to fitness",
      author: "Tuan Le",
      learning: 156,
      teaching: 12,
      isUserCard: true,
    },
    {
      id: 4,
      name: "Advanced Workout Plans",
      description:
        "Intensive training programs, Intensive training programs, Intensive training programs, Intensive training programs, Intensive training programs, Intensive training programs.",
      author: "Phuong Hoang",
      learning: 89,
      teaching: 8,
      isUserCard: true,
    },
  ];

  // const teachingClasses = [
  // {
  //     id: 5,
  //     name: "Gym Class",
  //     description: "Fitness training sessions",
  //     author: "Quang Bui",
  //     learning: 25,
  //     teaching: 1,
  //     isUserCard: true
  // }
  // ];

  const learningClasses = [
    {
      id: 6,
      name: "Cooking Class",
      description: "Interactive cooking lessons",
      author: "Lan Pham",
      learning: 1,
      teaching: 0,
      isUserCard: true,
    },
  ];

  const recommendedRoadmaps = [
    {
      id: 7,
      name: "React Advanced Patterns",
      description: "Master advanced React concepts",
      author: "Hieu Vo",
      learning: 15600,
      teaching: 89,
      isUserCard: false,
    },
    {
      id: 8,
      name: "Node.js Backend Development",
      description: "Server-side JavaScript mastery",
      author: "Bao Nguyen",
      learning: 9800,
      teaching: 67,
      isUserCard: false,
    },
    {
      id: 9,
      name: "Database Design Fundamentals",
      description: "Learn database architecture",
      author: "Dung Cao",
      learning: 7200,
      teaching: 34,
      isUserCard: false,
    },
    {
      id: 10,
      name: "TypeScript Essentials",
      description: "Strongly-typed JavaScript",
      author: "Khanh Vu",
      learning: 7200,
      teaching: 34,
      isUserCard: false,
    },
  ];
  return (
    <>
      {isLoggedIn && (
        <div className="home-container">
          <div className="profile-header">
            <div className="profile-info">
              <h2 className="profile-name">viethoangdz</h2>
            </div>
            <div className="teams-section">
              <button className="btn-create-team">+ Create Team</button>
            </div>
          </div>

          <div className="content-section">
            {/* Roadmap Marked Section */}
            <div className="section-block">
              <h3 className="section-title">
                <i className="bi bi-bookmark-fill"></i> Roadmap Marked
              </h3>
              <div className="roadmap-grid">
                {markedRoadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="roadmap-card-wrapper">
                    <RoadmapCardInHome
                      id={roadmap.id}
                      name={roadmap.name}
                      description={roadmap.description}
                      author={roadmap.author}
                      learning={roadmap.learning}
                      teaching={roadmap.teaching}
                      isUserCard={false}
                      isMarked={roadmap.isMarked}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Roadmaps Section */}
            <div className="section-block">
              <h3 className="section-title">
                <i className="bi bi-map"></i> Your Custom Roadmaps
              </h3>
              <div className="roadmap-grid">
                {myRoadmaps?.map((roadmap) => (
                  <div
                    key={roadmap.id}
                    className="roadmap-card-wrapper"
                    onClick={() => ViewPageRoadmap(roadmap)}
                  >
                    <RoadmapCardInHome
                      id={roadmap.id}
                      name={roadmap.name}
                      description={roadmap.description}
                      author={roadmap.author}
                      learning={roadmap.learning}
                      teaching={roadmap.teaching}
                      isUserCard={true}
                      isMarked={roadmap.isMarked}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  </div>
                ))}
                <div className="roadmap-card-wrapper">
                  <button className="btn-add-roadmap" onClick={onCreateRoadmap}>
                    <i className="bi bi-plus-circle"></i>
                    <span>Create Your Own Roadmap</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Teaching Classes Section */}
            <div className="section-block">
              <h3 className="section-title">
                <i className="bi bi-person-video3"></i> Your Class Teaching
              </h3>
              <div className="roadmap-grid">
                {listTeachingClass?.map((roadmap) => (
                  <a
                    key={roadmap.id}
                    href={`classroom/view/${roadmap.name}/${roadmap.id}`}
                  >
                    <div key={roadmap.id} className="roadmap-card-wrapper">
                      <RoadmapCardInHome
                        id={roadmap.id}
                        name={roadmap.name}
                        description={roadmap.description}
                        author={roadmap.author}
                        learning={""}
                        teaching={""}
                        isUserCard={true}
                        isMarked={""}
                        onBookmarkToggle={handleBookmarkToggle}
                      />
                    </div>
                  </a>
                ))}
                <div className="roadmap-card-wrapper">
                  <button
                    className="btn-add-roadmap"
                    onClick={onCreateClassroom}
                  >
                    <i className="bi bi-plus-circle"></i>
                    <span>Create Your Class</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Learning Classes Section */}
            <div className="section-block">
              <h3 className="section-title">
                <i className="bi bi-mortarboard"></i> Your Class Learning
              </h3>
              <div className="roadmap-grid">
                {listLearningClass?.map((roadmap) => (
                  <a
                    key={roadmap.id}
                    href={`classroom/view-student/${roadmap.name}/${roadmap.classroomId}`}
                  >
                    <div key={roadmap.id} className="roadmap-card-wrapper">
                      <RoadmapCardInHome
                        id={roadmap.id}
                        name={roadmap.name}
                        description={roadmap.description}
                        author={roadmap.author}
                        learning={""}
                        teaching={""}
                        isUserCard={true}
                        isMarked={""}
                        onBookmarkToggle={handleBookmarkToggle}
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Recommended Roadmaps Section */}
            <div className="section-block">
              <h3 className="section-title">
                <i className="bi bi-lightbulb"></i> Recommended Roadmaps
              </h3>
              <div className="roadmap-grid">
                {recommendedRoadmaps.map((roadmap) => (
                  <div key={roadmap.id} className="roadmap-card-wrapper">
                    <RoadmapCardInHome
                      id={roadmap.id}
                      name={roadmap.name}
                      description={roadmap.description}
                      author={roadmap.author}
                      learning={roadmap.learning}
                      teaching={roadmap.teaching}
                      isUserCard={true}
                      isMarked={roadmap.isMarked}
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {openCreateRoadmap && (
        <CreateRoadmap
          onClose={() => setOpenCreateRoadmap(false)}
          user={user}
        />
      )}
      {openCreateClassroom && (
        <CreateClassroom
          onClose={() => setOpenCreateClassroom(false)}
          user={user}
        />
      )}
    </>
  );
}
