import React from "react";
import ".//RoadmapsComponent.css";
import RoadmapViewInList from "#components/RoadmapView/RoadmapViewInList/RoadmapViewInList.jsx";

const roadmapList = [
  {
    name: "for newbie in gym",
    isPublic: false,
    topicCount: 15,
    learningCount: 0
  },
  {
    name: "for newbie in gym",
    isPublic: true,
    topicCount: 15,
    learningCount: 0
  }
];

const RoadmapList = () => {
  return (
    <div className="roadmap-list-wrapper">
      <div className="roadmap-total">
        Total {roadmapList.length} roadmaps
      </div>
      <div className="roadmap-list">
        {roadmapList.map((rm, idx) => (
          <RoadmapViewInList key={idx} rm={rm} />
        ))}
      </div>
      <button className="roadmap-add-btn">+ add new roadmap</button>
    </div>
  );
};

export default RoadmapList;
