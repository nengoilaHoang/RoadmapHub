import { useState, useEffect } from 'react'
import { MarkerType } from '@xyflow/react';
export default function RightBarEdge(props) {
    const { selectedEdge, onEdgeChange } = props
    const [color, setColor] = useState(selectedEdge.style?.stroke || "#1e90ff");
    const [strokeStyle, setStrokeStyle] = useState(selectedEdge.style?.strokeDasharray);
    const [arrowEnd, setArrowEnd] = useState(selectedEdge.arrowEnd || undefined);
    const [arrowStart, setArrowStart] = useState(selectedEdge.arrowStart|| undefined);
    const [path, setPath] = useState(selectedEdge.type || "default");
    useEffect(()=>{
        setColor(selectedEdge.style?.stroke || "#1e90ff");
        setStrokeStyle(selectedEdge.style?.strokeDasharray);
        setArrowEnd(selectedEdge.arrowEnd || undefined);
        setArrowStart(selectedEdge.arrowStart|| undefined);
        setPath(selectedEdge.type || "default");
    },[selectedEdge])
    useEffect(() => {
        onEdgeChange({
            ...selectedEdge,
            style: {
                stroke: color,
                strokeWidth: 2,
                strokeDasharray: strokeStyle
            },
            type: path,

            markerEnd:
                arrowEnd === "arrow-end"
                    ? { type: MarkerType.Arrow, width: 16, height: 10, color: color }
                    : arrowEnd === "Arrow-end"
                        ? { type: MarkerType.ArrowClosed, width: 16, height: 16, color: color }
                        : undefined,

            markerStart:
                arrowStart === "arrow-start"
                    ? { type: MarkerType.Arrow, width: 16, height: 10, color: color }
                    : arrowStart === "Arrow-start"
                        ? { type: MarkerType.ArrowClosed, width: 16, height: 16, color: color }
                        : undefined,
            arrowStart: arrowStart,
            arrowEnd: arrowEnd           
        });
    }, [color, strokeStyle, arrowEnd, arrowStart, path]);
    return (
        <div className={`rightbar ${selectedEdge ? 'show' : ''}`}>
            <div className="rightbar-content">
                <h4>EDGE STYLE</h4>
                <div className="property-item">
                    <div className="property-label">
                        <span>Color</span>
                    </div>
                    <div className="color-picker-wrapper">
                        <input
                            type="color"
                            className="color-picker"
                            value={color || '#1e90ff'}
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <input
                            type="text"
                            className="color-value-input"
                            value={color || '#1e90ff'}
                            onChange={(e) => {
                                if (/^#[0-9A-Fa-f]{0,6}$/.test(e.target.value)) {
                                    setColor(e.target.value)
                                }
                            }}
                            maxLength={7}
                        />
                    </div>
                </div>
                <div className="property-item">
                    <div className="property-label">
                        <span>Stroke Style</span>
                    </div>
                    <div className="button-group-pa">
                        <button
                            className={`align-btn ${strokeStyle === undefined ? 'active' : ''}`}
                            onClick={() => setStrokeStyle(undefined)}
                        >
                            ─
                        </button>
                        <button
                            className={`align-btn ${strokeStyle === '5.5' ? 'active' : ''}`}
                            onClick={() => setStrokeStyle('5.5')}
                        >
                            ⋯
                        </button>
                    </div>
                </div>
                <div className="property-item">
                    <div className="property-label">
                        <span>Arrow Style</span>
                    </div>
                    <div className="button-group-pa">
                        <button
                            className={`align-btn ${arrowStart === 'arrow-start' ? 'active' : ''}`}
                            onClick={() => {
                                setArrowStart("arrow-start")
                            }}
                        >
                            <i className="bi bi-arrow-left"></i>
                        </button>
                        <button
                            className={`align-btn ${arrowStart === 'Arrow-start' ? 'active' : ''}`}
                            onClick={() => { setArrowStart("Arrow-start")}}
                        >
                            <i className="bi bi-caret-left-fill"></i>
                        </button>
                        <button
                            className={`align-btn ${arrowEnd === 'arrow-end' ? 'active' : ''}`}
                            onClick={() => { setArrowEnd("arrow-end")}}
                        >
                            <i className="bi bi-arrow-right"></i>
                        </button>
                        <button
                            className={`align-btn ${arrowEnd === 'Arrow-end' ? 'active' : ''}`}
                            onClick={() => { setArrowEnd("Arrow-end")}}
                        >
                            <i className="bi bi-caret-right-fill"></i>
                        </button>
                    </div>
                </div>
                <div className="property-item ">
                    <div className="property-label">
                        <span>Path</span>
                    </div>
                    <div className="button-group-pa">
                        <button
                            className={`align-btn ${selectedEdge.type === 'straight' ? 'active' : ''}`}
                            onClick={() => setPath("straight")}
                        >
                            ─
                        </button>
                        <button
                            className={`align-btn ${selectedEdge.type === 'step' ? 'active' : ''}`}
                            onClick={() => setPath("step")}
                        >
                            ┐
                        </button>
                        <button
                            className={`align-btn ${selectedEdge.type === 'smoothstep' ? 'active' : ''}`}
                            onClick={() => setPath("smoothstep")}
                        >
                            ∿
                        </button>
                        <button
                            className={`align-btn ${selectedEdge.type === 'default' ? 'active' : ''}`}
                            onClick={() => setPath("default")}
                        >
                            S
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}