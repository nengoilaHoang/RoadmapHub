import './RightBarCheckList.css'
import { useEffect, useState } from "react";
export default function RightBarCheckList({ selectedNode, onDeleteNode, onNodeChange }) {
    if (!selectedNode) return null;
   
    const changePosition = (axis, value) => {
        const updateNode = {
            ...selectedNode,
            position: {
                ...selectedNode.position,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                [axis]: parseFloat(value)
            }
        }
        onNodeChange(updateNode);
    };
    const changeSize = (dimension, value) => {
      //console.log(value,selectedNode)
      const updateNode = {
            ...selectedNode,
            data:{
              ...selectedNode.data,
              [dimension]: parseFloat(value)
            },
            measured:{
              ...selectedNode.measured,
              [dimension]: parseFloat(value)
            }
           
        }
        onNodeChange(updateNode);
    };
   
    const updateItem = (text,indexUpdate) => {
        const updateItem={
            text:text,
            checked:false
        }
        const updatedItems = selectedNode.data.itemsCheckList.map((item, index) => (index === indexUpdate  ? updateItem:item))
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                itemsCheckList:updatedItems
            }
        })
    }
    const deleteItem = (indexUpdate) => {
        const updatedItems = selectedNode.data.itemsCheckList.filter((item, index) => index !== indexUpdate)
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                itemsCheckList:updatedItems
            }
        })
    }
    const addItemUI = ()=>{
        const newItem = {
            text: '',
            checked: false
        };
           onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                itemsCheckList:selectedNode.data.itemsCheckList? [
                    ...selectedNode.data.itemsCheckList,
                    newItem
                ]:[newItem]
            }})
    }
    const changeWidthHeight=()=>{
    const updateNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                width:180,
                height:45
            }
        }
    onNodeChange(updateNode);
    }
    useEffect(()=>{
    const updateNode = {
        ...selectedNode,
        data: {
            ...selectedNode.data,
            width:selectedNode.measured?.width,
            height:selectedNode.measured?.height
        }
      }
    onNodeChange(updateNode)
  },[selectedNode.measured])
    
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <div className="node-config-section dimensions">
                    <div className="dimension-input">
                        <label>X</label>
                        <input type="number" value={selectedNode.position?.x || 0} onChange={(e) => changePosition('x', e.target.value)} />
                    </div>
                    <div className="dimension-input">
                        <label>Y</label>
                        <input type="number" value={selectedNode.position?.y || 0} onChange={(e) => changePosition('y', e.target.value)} />
                    </div>
                    <div className="dimension-input">
                        <label>W</label>
                        <input type="number" min="180" value={selectedNode.measured?.width || 0} onChange={(e) => changeSize('width', e.target.value)} />
                    </div>
                    <div className="dimension-input">
                        <label>H</label>
                        <input type="number" min="45" value={selectedNode.measured?.height || 0} onChange={(e) => changeSize('height', e.target.value)} />
                    </div>
                </div>
                <button className="auto-size-btn mb-4" onClick={changeWidthHeight}>↔ Auto-Size</button>
                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    CheckList Style
                </h3>
                <div className="items-section">
                    <h3 className="section-title">
                        <i className="bi bi-list-check"></i>
                        Add Items
                    </h3>

                    <div className="items-list">
                        { selectedNode.data?.itemsCheckList?.map((item, index) => (
                            <div key={index} className="item-row">
                                <input
                                    type="text"
                                    className="item-input"
                                    value={item.text}
                                    onChange={(e) => updateItem(e.target.value, index)}
                                    placeholder="Enter item text"
                                />
                                <button
                                    className="delete-item-btn"
                                    onClick={() => deleteItem(index)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>))
                       }
                        
                    </div>

                    <button className="add-item-btn" onClick={addItemUI}>
                        <i className="bi bi-plus-lg"></i>
                        Add Item
                    </button>
                </div>
            </div>

        </div>
    )
}