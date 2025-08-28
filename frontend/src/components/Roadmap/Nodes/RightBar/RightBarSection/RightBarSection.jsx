import './RightBarSection.css'
import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarSection({ selectedNode, onDeleteNode }) {
    if (!selectedNode) return null;
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} />

                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    Section Style
                </h3>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-square-fill"></i>
                        <span>Background Color</span>
                    </div>
                    <div className="color-picker-wrapper">
                        <input
                            type="color"
                            className="color-picker"
                            value={selectedNode.data?.backgroundColor || '#ffffff'}
                            onChange={(e) => {/* handle color change */ }}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.backgroundColor || '#ffffff'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    /* handle color change */
                                    //selectedNode.data?.backgroundColor = `#${e.target.value}`;
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-border"></i>
                        <span>Border Color</span>
                    </div>
                    <div className="color-picker-wrapper">
                        <input
                            type="color"
                            className="color-picker"
                            value={selectedNode.data?.borderColor || '#000000'}
                            onChange={(e) => {/* handle color change */ }}
                        />
<input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.backgroundColor || '#ffffff'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    /* handle color change */
                                    //selectedNode.data?.backgroundColor = `#${e.target.value}`;
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-circle-square"></i>
                        <span>Border Radius</span>
                    </div>
                    <div className="radius-input-wrapper">
                        <input
                            type="number"
                            className="radius-input"
                            value={selectedNode.data?.borderRadius || 0}
                            min="0"
                            max="50"
                        />
                        <span className="unit">px</span>
                    </div>
                </div>

            </div>
        </div>
    )
}