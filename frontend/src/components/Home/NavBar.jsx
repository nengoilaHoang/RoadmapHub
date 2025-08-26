import { useCheckLogin } from "../../hooks/userCheckLogin"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './home.css';
export default function NavBar() {
    const navigate = useNavigate();
    const { isLoggedIn } = useCheckLogin();
    function onLogin() {navigate('/login')}
    function onSignup() {navigate('/signup')}
    async function onLogout() {
        await axios.post(`http://localhost:5000/api/accounts/logout`,{}, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true
        });
        navigate('/login');
    }
    let dropdown;
    if (!isLoggedIn) {
        dropdown = 
        <div className="auth-buttons">
            <button className="btn login-btn" onClick={onLogin}>Login</button>
            <button className="btn logout-btn" onClick={onSignup}>sign up</button>
        </div>
    }
    else{
        dropdown = 
        <div className="dropdown">
        <button
            className="btn p-0 border-0 rounded-circle overflow-hidden"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{ width: '60px', height: '60px' }}
        >
            <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
            />
        </button>
        <ul className="dropdown-menu dropdown-menu-dark">
            <li>
            <a className="dropdown-item" href="#"><i className="bi bi-0-circle"></i> Account</a>
            </li>
            <li><a className="dropdown-item" href="#">My Profile</a></li>
            <li><a className="dropdown-item" href="#">Friends</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">New Roadmap</a></li>
            <li><a className="dropdown-item" href="#">Roadmaps</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Teams</a></li>
            <li><a className="dropdown-item" onClick={onLogout}>Log out</a></li>
        </ul>
        </div>
    }
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
                {dropdown}
            </div>
            </div>
        </div>
        </nav>

    )
}