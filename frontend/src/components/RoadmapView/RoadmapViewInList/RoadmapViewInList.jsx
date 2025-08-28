const RoadmapViewInList = ({ rm, idx }) => {
    return(
    <div className="roadmap-item" key={idx}>
        <div className="roadmap-top">
            <div className="roadmap-info">
            <div className="roadmap-name">{rm.name}</div>
            <div className="roadmap-meta-row">
                <span className="roadmap-meta roadmap-privacy">
                {rm.isPublic
                    ? <span><span role="img" aria-label="public">🔓</span> public</span>
                    : <span><span role="img" aria-label="private">🔒</span> private</span>
                }
                </span>
                <span className="roadmap-meta roadmap-topic">
                <span role="img" aria-label="topic">📝</span> {rm.topicCount} topic
                </span>
                <span className="roadmap-meta roadmap-learning">
                <span role="img" aria-label="learning">👤</span> {rm.learningCount} learning
                </span>
            </div>
            </div>
            <div className="roadmap-action">
            <span className="roadmap-menu">⋮</span>
            <button className="roadmap-view">view</button>
            <button className="roadmap-edit">edit</button>
            </div>
        </div>
        </div>
    )
}

export default RoadmapViewInList;