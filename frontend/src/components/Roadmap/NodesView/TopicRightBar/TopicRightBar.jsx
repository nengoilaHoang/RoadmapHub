import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import "./TopicRightBar.css";
import QuizItem from "../SmallItem/QuizItem/QuizItem";
import ItemTopic from "../SmallItem/ItemTopic/ItemTopic";
import api from '../../../../utils/api.js';

export default function TopicRightBar({ selectedNode, setIsReload, isReload }) {
  //const [isUpdating, setIsUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [topicStatus, setTopicStatus] = useState();
  const [items, setItems] = useState(selectedNode?.data?.itemsTopic ?? [])
  useEffect(()=>{
    //console.log(selectedNode);
    setTopicStatus(selectedNode.data?.topicStatus??"none");
    //console.log(selectedNode.data?.topicStatus??"none");
    ////console.log(topicStatus);
  },[])
  const getLearnTopic = async() =>{
    try {
      const res = await api.get(`/learnTopic/get-learnTopic/${selectedNode?.id}`,{withCredentials: true})
      //console.log("run here: ",res.data);
      return res.data.success;
    } catch (error) {
      console.error("error status:", error.response?.status);
      console.error("error data:", error.response?.data);
    }
  }
  const createLearnTopic = async() =>{
    await api.post(`learnTopic/create-learnTopic`,{topicId: selectedNode?.id, process: topicStatus},{withCredentials: true});
  }
  const updateLearnTopic = async() =>{
    await api.post(`learnTopic/update-learnTopic`,{topicId: selectedNode?.id, process: topicStatus},{withCredentials: true});
  }
  const deleteLearnTopic = async() =>{
    await api.post(`learnTopic/delete-learnTopic`,{topicId: selectedNode?.id, process: topicStatus},{withCredentials: true});
  }
  const changeTopicStatus = async(newValue) =>{
    //console.log(newValue);
    const learnTopic = await getLearnTopic();
    setIsReload(!isReload);
    //console.log(learnTopic);
    if(newValue === "none"){
      if(learnTopic){
        //console.log("delete");
        await deleteLearnTopic();
      }
    }
    else if(newValue !== null && newValue !== undefined){
      //console.log(learnTopic);
      if(!learnTopic){
        //console.log("create new");
        await createLearnTopic();
      }
      else{
        //console.log("update old");
        await updateLearnTopic();
      }
    }
  }
  useEffect(()=>{
    changeTopicStatus(topicStatus);
  },[topicStatus]);
  return (
    <div className={`topic-rightbar ${selectedNode ? "open" : ""}`}>
      <div className="tab-status-row">
        <div className="tab-list-compact">
          <button
            className={`tab-compact ${activeTab === "content" ? "active" : ""}`}
            onClick={() => setActiveTab("content")}
          >
            <span className="tab-icon">📄</span>
            Content
          </button>
          <button
            className={`tab-compact ${activeTab === "feedback" ? "active" : ""}`}
            onClick={() => setActiveTab("feedback")}
          >
            <span className="tab-icon">💬</span>
            Feedback
          </button>
          <button
            className={`tab-compact ${activeTab === "quiz" ? "active" : ""}`}
            onClick={() => setActiveTab("quiz")}
          >
            <span className="tab-icon">🎯</span>
            Quiz
          </button>
        </div>

        <select
          className="status-select-inline"
          value={topicStatus}
          onChange={(e) => setTopicStatus(e.target.value)}
        >
          <option value="none">None</option>
          <option value="progress">In Progress</option>
          <option value="done">Done</option>
          <option value="skip">Skip</option>
        </select>
      </div>

      {/* Content Area */}
      <div className="rightbar-content">
        {activeTab === "content" && (
          <div className="content-panel-simple">
            {/* Title as H1 */}
            <h1 className="topic-title">
              {selectedNode?.data?.titleTopic || "there is no title"}
            </h1>
            
            {/* Description as paragraph */}
            <p className="topic-description">
              {selectedNode?.data?.descriptionTopic || "there is no content"}
            </p>
            
            <div className="links-divider">
              <span className="divider-label">Resources</span>
              <hr />
            </div>
            <div className="links-list">
            </div>
              {items.map((item, idx) => (
                <ItemTopic
                  key={idx}
                  type={item.type}
                  title={item.title}
                  href={item.url}
                  onTypeChange={() => {}}
                />
              ))}
          </div>
        )}

        {activeTab === "feedback" && (
          <div className="feedback-panel-simple">
            <div className="content-section">
              <h4 className="section-label">Feedback Notes</h4>
              <textarea
                className="feedback-input"
                placeholder="Write feedback here..."
                rows={6}
              />
            </div>
            
            <button className="submit-btn">Submit Feedback</button>
          </div>
        )}

        {activeTab === "quiz" && (
          <div className="quiz-panel-simple">
            <div className="quiz-list">
              <QuizItem name="bài 1" />
              <QuizItem name="bài 2" />
              <QuizItem name="bài 3" />
              <QuizItem name="bài 4" />
              <QuizItem name="bài 5" />
              <QuizItem name="bài 6" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
  