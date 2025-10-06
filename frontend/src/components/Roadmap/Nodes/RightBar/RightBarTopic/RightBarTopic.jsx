import React from "react";
import { useState,useEffect } from "react";
import RightBarTop from "../RightBarTop/RightBarTop";
import "./RightBarTopic.css";

export default function RightBarTopic({ selectedNode, onDeleteNode , onNodeChange}) {
  if (!selectedNode) return null;
  const [activeTab, setActiveTab] = useState('properties');
   
  const changeColor = (letter)=>{
    onNodeChange({
      ...selectedNode,
      data:{
        ...selectedNode.data,
        width:selectedNode.measured?.width,
        height:selectedNode.measured?.height,
        backGroundColorTopic:letter,
      }
    })
  }
  const changeTitleTopic = (titleTopic)=>{
    onNodeChange({
      ...selectedNode,
      data:{
        ...selectedNode.data,
        width:selectedNode.measured?.width,
        height:selectedNode.measured?.height,
        titleTopic:titleTopic,
      }
    })
  }
  const changeDescriptionTopic = (descriptionTopic)=>{
    onNodeChange({
      ...selectedNode,
      data:{
        ...selectedNode.data,
        width:selectedNode.measured?.width,
        height:selectedNode.measured?.height,
        descriptionTopic:descriptionTopic,
      }
    })
  }
   const updateItem = (item,key,text,indexUpdate) => {
        let updateItem = item;
        if(key === 1)
        {
           updateItem={
            ...updateItem,
            type: text, 
        }
        }
        else if(key === 2)
        {
           updateItem={
            ...updateItem,
            title: text, 
        }
        }
        else {
          updateItem={
            ...updateItem,
            url: text, 
        }
        }
        const updatedItems = selectedNode.data.itemsTopic.map((item, index) => (index === indexUpdate  ? updateItem:item))
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                itemsTopic:updatedItems
            }
        })
    }
    const deleteItem = (indexUpdate) => {
        const updatedItems = selectedNode.data.itemsTopic.filter((item, index) => index !== indexUpdate)
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                itemsTopic:updatedItems
            }
        })
    }
    const addItemUI = ()=>{
        const newItem = {
            type: 'Video', 
            title: '',
            url: ''
        };
           onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                itemsTopic:selectedNode.data.itemsTopic? [
                    ...selectedNode.data.itemsTopic,
                    newItem
                ]:[newItem]
            }})
    }
    ////console.log(selectedNode);
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
              <input type="text" className="form-control" placeholder="Enter title" value={selectedNode.data?.titleTopic} onChange={(e)=>{changeTitleTopic(e.target.value)}}/>
            </div>

            <div className="form-group">
              <label className="form-label">DESCRIPTION</label>
              <textarea 
                className="form-control" 
                placeholder="Enter description"
                rows="10"
                value={selectedNode.data?.descriptionTopic}
                onChange={(e)=>{changeDescriptionTopic(e.target.value)}}
              />
            </div>

            <div className="links-section">
              {selectedNode.data?.itemsTopic?.map((item, index) => (
                <div key={index} className="link-item">
                  <select className="form-select mb-2" value={item.type} onChange={(e)=>updateItem(item,1,e.target.value,index)}>
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
                      value={item.title}
                      onChange={(e)=>updateItem(item,2,e.target.value,index)}
                    />
                  </div>

                  <div className="input-group mb-2">
                    <input 
                      type="url" 
                      className="form-control"
                      placeholder="Resource URL"
                      value={item.url}
                      onChange={(e)=>updateItem(item,3,e.target.value,index)}
                    />
                  </div>

                  <button 
                    className="btn btn-outline-danger w-100 mb-3"
                    onClick={() => deleteItem(index)}
                  >
                    <i className="bi bi-trash"></i> Remove
                  </button>
                </div>
              ))}

              <button 
                className="btn btn-outline-primary w-100"
                onClick={addItemUI}
              >
                Add Link
              </button>
            </div>
        </div>)}
    </div>
  );
}