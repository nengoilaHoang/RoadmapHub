import React from "react";
import { useState } from "react";
import RightBarTop from "../RightBarTop/RightBarTop";
import "./RightBarTopic.css";

export default function RightBarTopic({ selectedNode, onDeleteNode , onNodeChange}) {
  if (!selectedNode) return null;
  const [activeTab, setActiveTab] = useState('properties');
  const [links, setLinks] = useState([{ type: 'Video', title: '', url: '' }]);
  const addLink = () => {
    selectedNode.content_link.push()
    setLinks([...links, { type: 'Video', title: '', url: '' }]);
  };
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };
  const changeColor = (letter)=>{
    onNodeChange({
      ...selectedNode,
      data:{
        ...selectedNode.data,
        backGroundColorTopic:letter,
      }
    })
  }
  const updateLink = ()=>{
    onNodeChange({
      ...selectedNode,
      data:{
        ...selectedNode.data,
        items:links
      }
    })
  }
  return (
    <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
      <div className="tab-buttons">
        <button 
          className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
          onClick={() => setActiveTab('properties')}
        >
          Properties
        </button>
        <button 
          className={`tab-btn ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Content & Links
        </button>
      </div>
      {activeTab === 'properties' ? 
      (<div className="rightbar-content">
        <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
        <div className="node-config-section">
          <h4>NODE COLOR</h4>
          <div className="color-buttons">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(letter => (
              <button key={letter} className={`color-btn color-${letter.toLowerCase()}`} onClick={()=>changeColor(letter)}>
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>):( 
        <div className="rightbar-content">
         
            <div className="form-group">
              <label className="form-label">TITLE</label>
              <input type="text" className="form-control" placeholder="Enter title" />
            </div>

            <div className="form-group">
              <label className="form-label">DESCRIPTION</label>
              <textarea 
                className="form-control" 
                placeholder="Enter description"
                rows="10"
              />
            </div>

            <div className="links-section">
              {links.map((link, index) => (
                <div key={index} className="link-item">
                  <select className="form-select mb-2">
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="opensource">Opensource</option>
                    <option value="course">Course</option>
                    <option value="website">Website</option>
                    <option value="podcast">Podcast</option>
                  </select>
                  
                  <div className="input-group mb-2">
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Resource Title"
                    />
                  </div>

                  <div className="input-group mb-2">
                    <input 
                      type="url" 
                      className="form-control"
                      placeholder="Resource URL"
                    />
                  </div>

                  <button 
                    className="btn btn-outline-danger w-100 mb-3"
                    onClick={() => removeLink(index)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              ))}

              <button 
                className="btn btn-outline-primary w-100"
                onClick={addLink}
              >
                Add Link
              </button>
            </div>
        </div>)}
    </div>
  );
}