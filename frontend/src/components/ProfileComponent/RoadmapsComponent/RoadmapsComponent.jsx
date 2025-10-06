import React, {useState, useEffect} from "react";
import "./RoadmapsComponent.css";
import RoadmapViewInList from "#components/RoadmapView/RoadmapViewInList/RoadmapViewInList.jsx";
import axios from "axios";
import api from "../../../utils/api";
//import {useCheckLogin} from '../../../hooks/userCheckLogin.jsx';
// const roadmapList = [
//   {
//     name: "for newbie in gym",
//     isPublic: false,
//     learning: 0,
//     teaching: 0
//   },
//   {
//     name: "for newbie in gym",
//     isPublic: true,
//     learning: 0,
//     teaching: 0
//   }
// ];

const RoadmapList = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  //const {user ,isLoggedIn} = useCheckLogin();
  ////console.log("user", user);
  useEffect(() => {
    // Simulate fetching data from an API
    const GetRoadmap = async () => {
      const response = await api.get('/roadmaps/getRoadmapByUserId', {
          withCredentials: true
      });
      //console.log(response.data.data);
      setRoadmaps(response.data.data);
    };
    GetRoadmap();
  }, []);
  return (
    <div className="roadmap-list-wrapper">
      <div className="roadmap-total">
        Total {roadmaps?.length ?? 0} roadmaps
      </div>
      <div className="roadmap-list">
        {roadmaps!=null? roadmaps.map((rm, idx) => (
          <RoadmapViewInList key={idx} rm={rm} />
        )):''}
      </div>
      <button className="roadmap-add-btn">+ add new roadmap</button>
    </div>
  );
};

export default RoadmapList;
