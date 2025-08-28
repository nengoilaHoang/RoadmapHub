import React, { use } from 'react';
import { Link } from 'react-router-dom';
import CreateRoadmap  from '#components/Roadmap/CreateRoadmap/createRoadmap.jsx';
import './Home.css';
import { useState } from 'react';
import {useCheckLogin} from '#hooks/userCheckLogin.jsx';

export default function Home() {
    const [openCreateRoadmap, setOpenCreateRoadmap] = React.useState(false);
    const onCreateRoadmap = () => {
        setOpenCreateRoadmap(true);
    }
    const { isLoggedIn, user } = useCheckLogin();
    return (
    <>
    {isLoggedIn &&  <div className="home-container">
            <div className="profile-header">
                <div className="profile-info">
                    <h2 className="profile-name">viethoangdz</h2>
                </div>
                <div className="teams-section">
                    {/* <Link to="/team1" className="team-link">team1</Link>
                    <Link to="/team2" className="team-link">team2</Link> */}
                    <button className="btn-create-team">+ create team</button>
                </div>
            </div>

            <div className="content-section">
                <div className="section-block">
                    <h3 className="section-title">
                        <i className="bi bi-bookmark-fill"></i> Roadmap marked
                    </h3>
                    <div className="roadmap-grid">
                        <div className="roadmap-card">
                            <span className="roadmap-name">learn cooking</span>
                            <i className="bi bi-bookmark-fill bookmark-icon"></i>
                        </div>
                        <div className="roadmap-card">
                            <span className="roadmap-name">learn drawing</span>
                            <i className="bi bi-bookmark-fill bookmark-icon"></i>
                        </div>
                    </div>
                </div>

                <div className="section-block">
                    <h3 className="section-title">
                        <i className="bi bi-map"></i> Your custom roadmaps
                    </h3>
                    <div className="roadmap-grid">
                        <div className="roadmap-card">for newbie in gym</div>
                        <div className="roadmap-card">for newbie in gym</div>
                        <button className="btn-add" onClick={onCreateRoadmap}>+ Create your own roadmap</button>
                    </div>
                </div>

                <div className="section-block">
                    <h3 className="section-title">
                        <i className="bi bi-person-video3"></i> Your class teaching
                    </h3>
                    <div className="roadmap-grid">
                        <div className="roadmap-card">gym class</div>
                        <button className="btn-add">+ Create your out class</button>
                    </div>
                </div>

                <div className="section-block">
                    <h3 className="section-title">
                        <i className="bi bi-mortarboard"></i> Your class learning
                    </h3>
                    <div className="roadmap-grid">
                        <div className="roadmap-card">cooking class</div>
                    </div>
                </div>
            </div>
    </div> }
   
    {openCreateRoadmap && <CreateRoadmap onClose={()=>setOpenCreateRoadmap(false) } user={user}/>}
    </>
       
    );
}