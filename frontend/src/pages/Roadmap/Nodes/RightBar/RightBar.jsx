import React from "react";
import { useState } from "react";
import "./RightBar.css";

export default function RightBar({ selectedNode, onDeleteNode }) {
  if (!selectedNode) return null;
  const [activeTab, setActiveTab] = useState('properties');
  const [links, setLinks] = useState([{ type: 'Video', title: '', url: '' }]);
  const addLink = () => {
    setLinks([...links, { type: 'Video', title: '', url: '' }]);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };
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
        <div className="node-config-section">
          <h4>LABEL</h4>
          <input 
            type="text" 
            className="label-input"
            value={selectedNode.data?.label || ''}
            onChange={(e) => {/* handle label change */}}
          />
        </div>

        <div className="node-config-section">
          <h4>TYPE</h4>
          <select className="type-select">
            <option>Subtopic</option>
            <option>Topic</option>
            <option>Section</option>
          </select>
        </div>

        <div className="node-config-section dimensions">
          <div className="dimension-input">
            <label>X</label>
            <input type="number" value={selectedNode.position?.x || 0} />
          </div>
          <div className="dimension-input">
            <label>Y</label>
            <input type="number" value={selectedNode.position?.y || 0} />
          </div>
          <div className="dimension-input">
            <label>W</label>
            <input type="number" value={selectedNode.width || 0} />
          </div>
          <div className="dimension-input">
            <label>H</label>
            <input type="number" value={selectedNode.height || 0} />
          </div>
        </div>

        <button className="auto-size-btn">↔ Auto-Size</button>

        <div className="node-config-section">
          <h4>LAYERING</h4>
          <div className="layer-buttons">
            <button title="Bring to front">⌃</button>
            <button title="Bring forward">△</button>
            <button title="Send backward">▽</button>
            <button title="Send to back">⌄</button>
          </div>
        </div>

        <div className="node-config-section">
          <h4>FONT SIZE</h4>
          <div className="font-size-buttons">
            <button>S</button>
            <button>M</button>
            <button>L</button>
            <button>XL</button>
            <button>XXL</button>
          </div>
        </div>

        <div className="node-config-section">
          <h4>NODE COLOR</h4>
          <div className="color-buttons">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'].map(letter => (
              <button key={letter} className={`color-btn color-${letter.toLowerCase()}`}>
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