import { useEffect, useState } from "react";

export default function RightBarTop({ selectedNode, onDeleteNode,onNodeChange }){
  const changeLabel = (e)=>{
    const updatedNode = {
      ...selectedNode,
      data:{
        ...selectedNode.data,
        width:selectedNode.measured?.width,
        height:selectedNode.measured?.height,
        label:e.target.value
      }
    }
    onNodeChange(updatedNode);
  }
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
  const changeFontSize = (size)=>{
    const updateNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                fontSize: size
            }
        }
    onNodeChange(updateNode);
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
    return(
        <>
        <div className="node-config-section">
          <h4>LABEL</h4>
          <input 
            type="text" 
            className="label-input"
            value={selectedNode.data?.label || ''}
            onChange={changeLabel}
          />
        </div>

        <div className="node-config-section dimensions">
          <div className="dimension-input">
            <label>X</label>
            <input type="number" value={selectedNode.position?.x || 0}
              onChange={(e)=>changePosition('x',e.target.value)}
             />
          </div>
          <div className="dimension-input">
            <label>Y</label>
            <input type="number" value={selectedNode.position?.y || 0}
            onChange={(e)=>changePosition('y',e.target.value)}
             />
          </div>
          <div className="dimension-input">
            <label>W</label>
            <input type="number"  min="180" value={selectedNode.measured?.width || 0}
            onChange={(e)=>changeSize('width',e.target.value)}
            />
          </div>
          <div className="dimension-input">
            <label>H</label>
            <input type="number" min="45" value={selectedNode.measured?.height || 0} 
            onChange={(e)=>changeSize('height',e.target.value)}
            />
          </div>
        </div>

        <button className="auto-size-btn" onClick={changeWidthHeight}>↔ Auto-Size</button>


        <div className="node-config-section">
          <h4>FONT SIZE</h4>
          <div className="font-size-buttons">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                        key={size}
                        className={selectedNode.data?.fontSize === size ? 'active' : ''}
                        onClick={() => changeFontSize(size)}
                    >
                        {size}
                    </button>
            ))}
          </div>
        </div>
        </>
    )
}