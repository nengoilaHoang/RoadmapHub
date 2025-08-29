import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarParagraph({ selectedNode, onDeleteNode }) {
    if (!selectedNode) return null;
    const changeBackGroundColor = (backgroundColorParagraph) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                backgroundColorParagraph: backgroundColorParagraph
            }
        })
    }
    const changeBorderColor = (borderColorParagraph) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                borderColorParagraph: borderColorParagraph
            }
        })
    }
    const changeTextColor = (textColorParagraph) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                textColorParagraph: textColorParagraph
            }
        })
    }
    const changePadding = (paddingParagraph)=>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                paddingParagraph: paddingParagraph
            }
        })
    }
    const changeTextAlign = (textAlignParagraph)=>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                textAlignParagraph: textAlignParagraph
            }
        })
    }
    const changeJustification = (justificationParagraph)=>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                justificationParagraph: justificationParagraph
            }
        })
    } 
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
                            value={selectedNode.data?.backgroundColorParagraph || '#ffffff'}
                            onChange={(e) => changeBackGroundColor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.backgroundColorParagraph || '#ffffff'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    changeBackGroundColor(e.target.value)
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
                            value={selectedNode.data?.borderColorParagraph || '#000000'}
                            onChange={(e) => changeBorderColor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.borderColorParagraph || '#ffffff'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    changeBorderColor(e.target.value)
                                }
                            }}
                            maxLength={7}
                        />
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
                            value={selectedNode.data?.textColorParagraph || '#000000'}
                            onChange={(e) => changeTextColor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={selectedNode.data?.textColorParagraph || '#000000'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    changeTextColor(e.target.value)
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
                            value={selectedNode.data?.paddingParagraph || 16}
                            min="0"
                            max="100"
                            onChange={(e)=>changePadding(e.target.value)}
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
                            className={`align-btn ${selectedNode.data?.textAlignParagraph === 'left' ? 'active' : ''}`}
                            onClick={() => changeTextAlign('left')}
                        >
                            <i className="bi bi-text-left"></i>
                        </button>
                        <button
                            className={`align-btn ${selectedNode.data?.textAlignParagraph === 'center' ? 'active' : ''}`}
                            onClick={() => changeTextAlign('center')}
                        >
                            <i className="bi bi-text-center"></i>
                        </button>
                        <button
                            className={`align-btn ${selectedNode.data?.textAlignParagraph === 'right' ? 'active' : ''}`}
                            onClick={() => changeTextAlign('right')}
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
                            className={`justify-btn ${selectedNode.data?.justificationParagraph === 'start' ? 'active' : ''}`}
                            onClick={() => changeJustification('start')}
                        >
                            <i className="bi bi-align-start"></i>
                        </button>
                        <button
                            className={`justify-btn ${selectedNode.data?.justificationParagraph === 'center' ? 'active' : ''}`}
                            onClick={() => changeJustification('center')}
                        >
                            <i className="bi bi-align-center"></i>
                        </button>
                        <button
                            className={`justify-btn ${selectedNode.data?.justificationParagraph === 'between' ? 'active' : ''}`}
                            onClick={() => changeJustification('between')}
                        >
                            <i className="bi bi-justify"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}