import RightBarTop from "../RightBarTop/RightBarTop";
export default function RightBarButton({ selectedNode, onDeleteNode, onNodeChange }) {
    if (!selectedNode) return null;
    const changeUrl = (url)=>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                url: url 
            }
        })
    }
    const changeTextColor = (textColorButton)=>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                textColorButton: textColorButton
            }
        })
    }
    const changeBackGroundColor = (backgroundColorButton) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                backgroundColorButton: backgroundColorButton
            }
        })
    }
    const changeBorderColor = (borderColorButton) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                borderColorButton: borderColorButton
            }
        })
    }
    const changeBorderRadius = (borderRadiusButton) =>{
        onNodeChange({
            ...selectedNode,
            data:{
                ...selectedNode.data,
                width:selectedNode.measured?.width,
                height:selectedNode.measured?.height,
                borderRadiusButton: borderRadiusButton
            }
        })
    }
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange}/>
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
                            onChange={(e) => changeUrl(e.target.value)}
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
                                value={selectedNode.data?.textColorButton ||'#FFFFFF'}
                                onChange={(e) => changeTextColor(e.target.value)}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.textColorButton || '#FFFFFF'}
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
                            <i className="bi bi-square-fill"></i>
                            <span>Background Color</span>
                        </div>
                        <div className="color-picker-wrapper">
                            <input
                                type="color"
                                className="color-picker"
                                value={selectedNode.data?.backgroundColorButton || '#2A79E4'}
                                onChange={(e) => changeBackGroundColor(e.target.value)}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.backgroundColorButton || '#2A79E4'}
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
                                value={selectedNode.data?.borderColorButton || '#2A79E4'}
                                onChange={(e) => changeBorderColor(e.target.value)}
                            />
                            <input
                                type="text"
                                className="color-value-input"
                                value={selectedNode.data?.borderColorButton || '#2A79E4'}
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
                            <i className="bi bi-circle-square"></i>
                            <span>Border Radius</span>
                        </div>
                        <div className="radius-input-wrapper">
                            <input
                                type="number"
                                className="radius-input"
                                value={selectedNode.data?.borderRadiusButton || 8}
                                min="0"
                                max="50"
                                onChange={(e) => changeBorderRadius(e.target.value)}
                            />
                            <span className="unit">px</span>
                        </div>
                    </div>
            </div>
        </div>
    )
}