
export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 py-4">
            
            <div className="container">
            <a className="navbar-brand" href="#">
                    <img src="https://www.svgrepo.com/show/303109/adobe-xd-logo.svg" alt="Logo" height="40" />
            </a>
            <h3 className="text-white me-4">Roadmap Hub</h3>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse p-2 justify-content-between" id="navbarNav">
                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
                <div className="dropdown">
                <button className="btn btn-warning  rounded-pill text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    <li><a className="dropdown-item" href="#"><i className="bi bi-0-circle"></i>Account</a></li>
                    <li><a className="dropdown-item" href="#">My Profile</a></li>
                    <li><a className="dropdown-item" href="#">Friends</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">New Roadmap</a></li>
                    <li><a className="dropdown-item" href="#">Roadmaps</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#">Teams</a></li>
                    <li><a className="dropdown-item" href="#">Log out</a></li>
                </ul>
            </div>
            </div>

            
            </div>
           

        </nav>

    )
}