import { useState } from "react";

export default function RightBarTop({ selectedNode, onDeleteNode,onNodeChange }){
  const changeLabel = (e)=>{
    const updatedNode = {
      ...selectedNode,
      data:{
        ...selectedNode.data,
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
                [axis]: parseFloat(value)
            }
        }
        onNodeChange(updateNode);
    };
  const changeSize = (dimension, value) => {
      const updateNode = {
            ...selectedNode,
            [dimension]: parseFloat(value)
        }
        onNodeChange(updateNode);
    };
  const changeFontSize = (size)=>{
    const updateNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                fontSize: size
            }
        }
    onNodeChange(updateNode);
  }
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
            <input type="number" value={selectedNode.data?.width || 0}
            onChange={(e)=>changeSize('width',e.target.value)}
             />
          </div>
          <div className="dimension-input">
            <label>H</label>
            <input type="number" value={selectedNode.data?.height || 0} 
            onChange={(e)=>changeSize('height',e.target.value)}
            />
          </div>
        </div>

        <button className="auto-size-btn">↔ Auto-Size</button>


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