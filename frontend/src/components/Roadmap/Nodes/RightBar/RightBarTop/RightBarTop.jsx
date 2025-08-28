export default function RightBarTop({ selectedNode, onDeleteNode }){
    return(
        <>
        <div className="node-config-section">
          <h4>LABEL</h4>
          <input 
            type="text" 
            className="label-input"
            value={selectedNode.data?.label || ''}
            onChange={(e) => {/* handle label change */}}
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
        </>
    )
}