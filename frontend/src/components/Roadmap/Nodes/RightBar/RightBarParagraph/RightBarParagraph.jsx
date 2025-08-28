import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarParagraph({ selectedNode, onDeleteNode }) {
    if (!selectedNode) return null;
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} />
                <h3 className="properties-title">
                    <i className="bi bi-palette"></i>
                    Paragraph Style
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
                        <span>Text color</span>
                    </div>
                    <div className="radius-input-wrapper">
                        <input
                            type="number"
                            className="radius-input"
                            value={selectedNode.text || 0}
                            min="0"
                            max="50"
                        />
                        <span className="unit">px</span>
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-type-bold"></i>
                        <span>Text Color</span>
                    </div>
                    <div className="color-picker-wrapper">
                        <input
                            type="color"
                            className="color-picker"
                            value={selectedNode.data?.textColor || '#000000'}
                            onChange={(e) => {/* handle color change */ }}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.textColor || '#000000'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    // handle color change
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-arrows-expand"></i>
                        <span>Padding</span>
                    </div>
                    <div className="number-input-wrapper">
                        <input
                            type="number"
                            className="number-input"
                            value={selectedNode.data?.padding || 16}
                            min="0"
                            max="100"
                        />
                        <span className="unit">px</span>
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-text-left"></i>
                        <span>Text Align</span>
                    </div>
                    <div className="button-group">
                        <button
                            className={`align-btn ${selectedNode.data?.textAlign === 'left' ? 'active' : ''}`}
                            onClick={() => {/* handle alignment */ }}
                        >
                            <i className="bi bi-text-left"></i>
                        </button>
                        <button
                            className={`align-btn ${selectedNode.data?.textAlign === 'center' ? 'active' : ''}`}
                            onClick={() => {/* handle alignment */ }}
                        >
                            <i className="bi bi-text-center"></i>
                        </button>
                        <button
                            className={`align-btn ${selectedNode.data?.textAlign === 'right' ? 'active' : ''}`}
                            onClick={() => {/* handle alignment */ }}
                        >
                            <i className="bi bi-text-right"></i>
                        </button>
                    </div>
                </div>

                <div className="property-item">
                    <div className="property-label">
                        <i className="bi bi-justify"></i>
                        <span>Justification</span>
                    </div>
                    <div className="button-group">
                        <button
                            className={`justify-btn ${selectedNode.data?.justify === 'start' ? 'active' : ''}`}
                            onClick={() => {/* handle justification */ }}
                        >
                            <i className="bi bi-align-start"></i>
                        </button>
                        <button
                            className={`justify-btn ${selectedNode.data?.justify === 'center' ? 'active' : ''}`}
                            onClick={() => {/* handle justification */ }}
                        >
                            <i className="bi bi-align-center"></i>
                        </button>
                        <button
                            className={`justify-btn ${selectedNode.data?.justify === 'between' ? 'active' : ''}`}
                            onClick={() => {/* handle justification */ }}
                        >
                            <i className="bi bi-justify"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}