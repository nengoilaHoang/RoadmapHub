import RightBarTop from "../RightBarTop/RightBarTop";

export default function RightBarTitle({ selectedNode, onDeleteNode, onNodeChange }) {
    if (!selectedNode) return null;
    return (
        <div className={`rightbar ${selectedNode ? 'show' : ''}`}>
            <div className="rightbar-content">
                <RightBarTop selectedNode={selectedNode} onDeleteNode={onDeleteNode} onNodeChange={onNodeChange} />
           </div>
        </div>
    )
}