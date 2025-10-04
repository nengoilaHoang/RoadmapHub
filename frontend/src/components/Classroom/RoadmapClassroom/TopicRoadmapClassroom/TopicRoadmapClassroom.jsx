import { useState,useEffect } from "react";

export default function TopicRoadmapClassroom(props){
    const{edit,handleSelectTopic,selectedRoadmap,setStep} = props
    return(<>
    <h2 className="mb-3">📚 Topics in {selectedRoadmap.data.roadmap.name}</h2>
          <ul className="list-group mb-3">
            {selectedRoadmap.data.roadmap.nodes.filter(t => t.type === "topic").map
            ((t, tIndex)=>(
              <li key={tIndex} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <span>
                    <strong>{t.data.label}</strong>
                  </span>
                  { edit && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleSelectTopic(t)}
                  >
                    + Create Quiz →
                  </button>)}
                  { !edit && (
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleSelectTopic(t)}
                  >
                    Xem Quiz →
                  </button>)}
                </div>
              </li>
            )
            )}
          </ul>
          <button className="btn btn-secondary" onClick={() => setStep(1)}>
            ← Back to Roadmaps
          </button>
        </>
    )
}