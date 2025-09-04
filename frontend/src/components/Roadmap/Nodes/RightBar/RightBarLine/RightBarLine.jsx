import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarLine({ selectedNode, onDeleteNode,onNodeChange }) {
    if (!selectedNode) return null;
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
            data:{
              ...selectedNode.data,
              [dimension]: parseFloat(value)
            },
        }
        onNodeChange(updateNode);
    };
    const changeStyle = (styleLine)=>{
        const updateNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                styleLine: styleLine
            }
        }
        onNodeChange(updateNode);
    }
    const changeLineColor = (lineColor) => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                lineColor: lineColor
            }
        }
        onNodeChange(updatedNode);
    }
     const changeStrokeWidth = (thickness) => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                thickness: thickness
            }
        }
        onNodeChange(updatedNode);
    }
    const changeWidthHeight=()=>{
    const updateNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                width: selectedNode.type === "horizontalline" ? 150 : selectedNode.type === "verticalline" ? 10 : 180,
                height: selectedNode.type === "horizontalline" ? 10 : selectedNode.type === "verticalline" ? 150 : 45,
            }
        }
    onNodeChange(updateNode);
  }
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <div className="node-config-section dimensions">
                    <div className="dimension-input">
                        <label>X</label>
                        <input type="number" value={selectedNode.position?.x || 0} onChange={(e) => changePosition('x', e.target.value)}/>
                    </div>
                    <div className="dimension-input">
                        <label>Y</label>
                        <input type="number" value={selectedNode.position?.y || 0} onChange={(e) => changePosition('y', e.target.value)}/>
                    </div>
                    <div className="dimension-input">
                        <label>W</label>
                        <input type="number" value={selectedNode.data?.width || 0} onChange={(e) =>{ 
                            if(selectedNode.type === "horizontalline") changeSize('width', e.target.value)}}/>
                    </div>
                    <div className="dimension-input">
                        <label>H</label>
                        <input type="number" value={selectedNode.data?.height || 0} onChange={(e) => {if(selectedNode.type === "verticalline") changeSize('height', e.target.value)}}/>
                    </div>
                </div>
                <button className="auto-size-btn mb-4" onClick={changeWidthHeight}>↔ Auto-Size</button>
                
                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    Line Style
                </h3>

                <div className="line-type-buttons">
                        <button 
                            className={`line-type-btn ${selectedNode.data.style === 'solid' ? 'active' : ''}`}
                            onClick={() => changeStyle('solid')}
                        >
                            <i className="bi bi-dash"></i>
                            Solid
                        </button>
                        <button 
                            className={`line-type-btn ${selectedNode.data.style === 'dashed' ? 'active' : ''}`}
                            onClick={() => changeStyle('dashed')}
                        >
                            <i className="bi bi-dash-lg"></i>
                            Dashed
                        </button>
                </div>

                    {/* Line Color */}
                    <div className="property-item">
                        <div className="property-label">
                            <i className="bi bi-palette"></i>
                            <span>Line Color</span>
                        </div>
                        <div className="color-picker-wrapper">
                            <input
                                type="color"
                                className="color-picker"
                                value={selectedNode.data?.lineColor || '#2B78E4'}
                                onChange={(e) => changeLineColor(e.target.value)}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.lineColor || '#2B78E4'}
                                onChange={(e) => changeLineColor(e.target.value)}
                                maxLength={7}
                            />
                        </div>
                    </div>

                    {/* Stroke Width */}
                    <div className="property-item">
                        <div className="property-label">
                            <i className="bi bi-arrows-expand"></i>
                            <span>Stroke Width</span>
                        </div>
                        <div className="stroke-input-wrapper">
                            <input
                                type="number"
                                className="stroke-input"
                                value={selectedNode.data?.thickness || 3}
                                min="10"
                                max="20"
                                onChange={(e) => changeStrokeWidth(e.target.value)}
                            />
                            <span className="unit">px</span>
                        </div>
                    </div>
            </div>
        </div>
    );

}