import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarButton({ selectedNode, onDeleteNode }) {
    if (!selectedNode) return null;
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} />
                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    Button Style
                </h3>
                <div className="property-item">
                        <div className="property-label">
                            <i className="bi bi-link-45deg"></i>
                            <span>URL</span>
                        </div>
                        <input
                            type="url"
                            className="url-input"
                            placeholder="https://example.com"
                            value={selectedNode.data?.url || ''}
                            onChange={(e) => {/* handle url change */}}
                        />
                </div>

                    <div className="property-item">
                        <div className="property-label">
                            <i className="bi bi-type"></i>
                            <span>Text Color</span>
                        </div>
                        <div className="color-picker-wrapper">
                            <input
                                type="color"
                                className="color-picker"
                                value={selectedNode.data?.textColor || '#FFFFFF'}
                                onChange={(e) => {/* handle color change */}}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.textColor || '#FFFFFF'}
                                onChange={(e) => {
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                        /* handle color change */
                                    }
                                }}
                                maxLength={7}
                            />
                        </div>
                    </div>

                    <div className="property-item">
                        <div className="property-label">
                            <i className="bi bi-square-fill"></i>
                            <span>Background Color</span>
                        </div>
                        <div className="color-picker-wrapper">
                            <input
                                type="color"
                                className="color-picker"
                                value={selectedNode.data?.backgroundColor || '#2A79E4'}
                                onChange={(e) => {/* handle color change */}}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.backgroundColor || '#2A79E4'}
                                onChange={(e) => {
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                        /* handle color change */
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
                                value={selectedNode.data?.borderColor || '#2A79E4'}
                                onChange={(e) => {/* handle color change */}}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.borderColor || '#2A79E4'}
                                onChange={(e) => {
                                    if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                        /* handle color change */
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
                                onChange={(e) => {/* handle radius change */}}
                            />
                            <span className="unit">px</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}