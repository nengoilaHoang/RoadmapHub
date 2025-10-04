import './SideBarClassroom.css'
export default function SideBarClassroom(props){
    const {activeNav,navItems,handleNavClick,selectedClass,setSelectedClass,classes} = props;
    return(
    <div className="sidebar">
            <div className="class-selector">
            <label className="class-label" htmlFor="class-select">Choose Class</label>
            <select
                id="class-select"
                className="class-select"
                value={JSON.stringify(selectedClass)}
                onChange={e => setSelectedClass(JSON.parse(e.target.value))}
            >
                {classes.map((classItem, idx) => (
                <option value={JSON.stringify(classItem)} key={idx}>{classItem.name}</option>
                ))}
            </select>
            </div>

            <nav className="sidebar-nav">
            {navItems.map((item) => (
                <div
                key={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                </div>
            ))}
            </nav>
    </div>)
}