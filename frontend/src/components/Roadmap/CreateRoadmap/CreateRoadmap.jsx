export default function CreateRoadmap() {
    <div className="popup-overlay">
    <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <div className="popup-header">
            <h2 className="popup-title">Create Roadmap</h2>
        </div>
        <p className="popup-subtitle">Add a title and description to your roadmap.</p>

        <form>
            <div className="form-group">
                <label className="form-label">ROADMAP TITLE</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Title"
                />
            </div>

            <div className="form-group">
                <label className="form-label">DESCRIPTION</label>
                <textarea 
                    className="form-control" 
                    placeholder="Enter Description"
                    maxLength={80}
                />
                <span className="char-count">0/80</span>
            </div>

            <div className="button-group">
                <button type="button" className="btn-cancel">Cancel</button>
                <button type="submit" className="btn-create">Create</button>
            </div>
        </form>
    </div>
    </div>
}