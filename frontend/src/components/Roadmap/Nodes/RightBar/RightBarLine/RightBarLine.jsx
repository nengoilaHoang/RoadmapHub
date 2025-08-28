import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarLine({ selectedNode, onDeleteNode }) {
    if (!selectedNode) return null;
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                                <div className="node-config-section">
                    <h4>LABEL</h4>
                    <input
                        type="text"
                        className="label-input"
                        value={selectedNode.data?.label || ''}
                        onChange={(e) => {/* handle label change */ }}
                    />
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
                <button className="auto-size-btn mb-4">↔ Auto-Size</button>
                
                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    Line Style
                </h3>

                <div className="line-type-buttons">
                        <button 
                            className={`line-type-btn ${selectedNode.data.style === 'solid' ? 'active' : ''}`}
                            onClick={() => handleLineStyleChange('solid')}
                        >
                            <i className="bi bi-dash"></i>
                            Solid
                        </button>
                        <button 
                            className={`line-type-btn ${selectedNode.data.style === 'dashed' ? 'active' : ''}`}
                            onClick={() => handleLineStyleChange('dashed')}
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
                                value={selectedNode.data.color || '#2B78E4'}
                                onChange={(e) => {/* handle color change */}}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data.color || '#2B78E4'}
                                onChange={(e) => {/* handle color text change */}}
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
                                value={selectedNode.data.thickness || 3}
                                min="1"
                                max="10"
                                onChange={(e) => {/* handle thickness change */}}
                            />
                            <span className="unit">px</span>
                        </div>
                    </div>
            </div>
        </div>
    );

}