import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCheckLogin } from "../../hooks/userCheckLogin";
import "./home.css";

export default function NavBar() {
  const navigate = useNavigate();
  const { isLoggedIn, profile } = useCheckLogin();

  const onLogin = () => navigate("/login");
  const onSignup = () => navigate("/signup");
  const onLogout = async () => {
    await axios.post(
      "http://localhost:5000/api/accounts/logout",
      {},
      { withCredentials: true }
    );
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 py-3">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Brand */}
        <div
          className="d-flex align-items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="../../../public/logo.png"
            alt="Logo"
            height="40"
            className="me-2"
          />
          <span className="h4 mb-0 text-white">Roadmap Hub</span>
        </div>

        {/* Toggler for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse content */}
        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          {/* Search form */}
          <form className="d-flex mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search roadmaps..."
              aria-label="Search"
              onKeyDown={(e) =>
                e.key === "Enter" && navigate(`/search/${e.target.value}`)
              }
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>

          {/* Auth / Avatar */}
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="btn p-0 border-0 rounded-circle overflow-hidden"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ width: "60px", height: "60px" }}
              >
                <img
                  src={profile.avatar || ""}
                  alt="User Avatar"
                  className="w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="/profile">
                    My Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Teams
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={onLogout}
                    type="button"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="auth-buttons d-flex gap-3">
              <button className="btn login-btn" onClick={onLogin}>
                Login
              </button>
              <button className="btn signup-btn" onClick={onSignup}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
