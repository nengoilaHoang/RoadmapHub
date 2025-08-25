import React from "react";
import ".//RoadmapsComponent.css";

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
          <div className="roadmap-item" key={idx}>
            <div className="roadmap-top">
              <div className="roadmap-info">
                <div className="roadmap-name">{rm.name}</div>
                <div className="roadmap-meta-row">
                  <span className="roadmap-meta roadmap-privacy">
                    {rm.isPublic
                      ? <span><span role="img" aria-label="public">🔓</span> public</span>
                      : <span><span role="img" aria-label="private">🔒</span> private</span>
                    }
                  </span>
                  <span className="roadmap-meta roadmap-topic">
                    <span role="img" aria-label="topic">📝</span> {rm.topicCount} topic
                  </span>
                  <span className="roadmap-meta roadmap-learning">
                    <span role="img" aria-label="learning">👤</span> {rm.learningCount} learning
                  </span>
                </div>
              </div>
              <div className="roadmap-action">
                <span className="roadmap-menu">⋮</span>
                <button className="roadmap-view">view</button>
                <button className="roadmap-edit">edit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="roadmap-add-btn">+ add new roadmap</button>
    </div>
  );
};

export default RoadmapList;
