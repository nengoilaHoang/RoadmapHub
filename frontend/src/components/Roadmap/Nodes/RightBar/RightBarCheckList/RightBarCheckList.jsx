import './RightBarCheckList.css'
export default function RightBarCheckList({ selectedNode, onDeleteNode, onNodeChange }) {
    if (!selectedNode) return null;
    const changeLabel = (e) => {
        const updatedNode = {
            ...selectedNode,
            data: {
                ...selectedNode.data,
                label: e.target.value
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
    const listItems = selectedNode.data?.items;
    // const changeItem = (updateItem)=>{
    //     listItems.map((item,index)=>())
    // }
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <div className="node-config-section">
                    <h4>LABEL</h4>
                    <input
                        type="text"
                        className="label-input"
                        value={selectedNode.data?.label || ''}
                        onChange={(e) => changeLabel(e.target.value)}
                    />
                </div>
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
                        <input type="number" value={selectedNode.width || 0} onChange={(e) => changePosition('width', e.target.value)} />
                    </div>
                    <div className="dimension-input">
                        <label>H</label>
                        <input type="number" value={selectedNode.height || 0} onChange={(e) => changePosition('height', e.target.value)} />
                    </div>
                </div>
                <button className="auto-size-btn mb-4">↔ Auto-Size</button>
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
                        {selectedNode.data?.items?.map((item, index) => (
                            <div key={index} className="item-row">
                                <input
                                    type="text"
                                    className="item-input"
                                    value={item.text}
                                    onChange={(e) => {/* handle item change */ }}
                                    placeholder="Enter item text"
                                />
                                <button
                                    className="delete-item-btn"
                                    onClick={() => {/* handle delete */ }}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <button className="add-item-btn">
                        <i className="bi bi-plus-lg"></i>
                        Add Item
                    </button>
                </div>
            </div>

        </div>
    )
}