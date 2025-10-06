import React from 'react';
import { Link } from 'react-router-dom';
import './TopBarView.css';

export default function TopBarView(props) {
    const {roadmap} = props 
    return (
        <div className="topbar-container">
            <div className="topbar-navigation">
                <Link to="/roadmaps" className="back-link">
                    <i className="bi bi-arrow-left"></i> All Roadmaps
                </Link>

                <div className="actions-group">
                    <button className="btn-bookmark">
                        <i className="bi bi-bookmark"></i>
                    </button>
                    <div class="dropdown">
                        <button className="btn-schedule" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots-vertical"></i>
                            Action
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href={`/roadmap/edit/${roadmap.name}/${roadmap.id}`}>Edit</a></li>
                            <li><a class="dropdown-item" href="#">Delete</a></li>
                        </ul>
                    </div>


                    <button className="btn-schedule">
                        <i className="bi bi-calendar3"></i>
                        Schedule Learning Time
                    </button>

                    <button className="btn-download">
                        <i className="bi bi-download"></i>
                        Download
                    </button>

                    <button className="btn-share">
                        <i className="bi bi-share"></i>
                        Share
                    </button>
                </div>
            </div>

            <div className="roadmap-header">
                <h1 className="roadmap-title">Frontend Developer</h1>
                <p className="roadmap-subtitle">
                    Step by step guide to becoming a modern frontend developer in 2025
                </p>
            </div>

            <div className="roadmap-tabs">
                <button className="tab-btn active">
                    <i className="bi bi-map"></i> Roadmap
                </button>
                <button className="tab-btn">
                    <i className="bi bi-folder"></i> Projects
                </button>
                <button className="tab-btn">
                    <i className="bi bi-robot"></i> AI Tutor
                </button>
                <button className="tab-btn personalize">
                    <i className="bi bi-person-gear"></i> Personalize
                    <span className="badge-new">New</span>
                </button>
            </div>
        </div>
    );
}