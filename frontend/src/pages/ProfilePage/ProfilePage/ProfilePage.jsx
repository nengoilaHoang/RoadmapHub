import React, { useState } from 'react';
import './ProfilePage.css';
import ProfileComponent from '../ProfileComponent/ProfileComponent.jsx';
import SettingComponent from '../SettingComponent/SettingComponent.jsx';
import FriendsComponent from '../FriendsComponent/FriendsComponent.jsx';
import RoadmapsComponent from '../RoadmapsComponent/RoadmapsComponent.jsx';

const ProfilePage = () => {
    //side bar data
    const [selectedTeam, setSelectedTeam] = useState('Lê Văn Việt Hoàng');
    const [activeNav, setActiveNav] = useState('Profile');

    const changeIntoSetting = () => {
        setMainContent(setting);
        setActiveNav('Setting');
    };

    const profile = <ProfileComponent changeIntoSetting={changeIntoSetting}/>;
    const setting = <SettingComponent/>;
    const friends = <FriendsComponent/>;
    const roadmaps = <RoadmapsComponent/>;

    const [mainContent, setMainContent] = useState(profile);
    const handleNavClick = (navId) => {
        setActiveNav(navId);
        if (navId === 'Profile') {setMainContent(profile);}
        else if (navId === 'Setting') {setMainContent(setting);}
        else if (navId === 'Friends') {setMainContent(friends);}
        else if (navId === 'Roadmaps') {setMainContent(roadmaps);}
    };

    const teams = [
        'Lê Văn Việt Hoàng',
        'Nguyễn Văn A',
        'Trần Thị B',
        'Lê Văn C',
        'Hoàng Đức D'
    ];

    const navItems = [
        { id: 'Profile', label: 'Profile', icon: '👤' },
        { id: 'Friends', label: 'Friends', icon: '👥' },
        { id: 'Roadmaps', label: 'Roadmaps', icon: '🗺️' },
        { id: 'Setting', label: 'Setting', icon: '⚙️' }
    ];

    return (
        <div className="profile-container">
        <div className="sidebar">
            <div className="team-selector">
            <label className="team-label" htmlFor="team-select">Choose Team</label>
            <select
                id="team-select"
                className="team-select"
                value={selectedTeam}
                onChange={e => setSelectedTeam(e.target.value)}
            >
                {teams.map((team, idx) => (
                <option value={team} key={idx}>{team}</option>
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
        </div>
            <div className="main-content">
                {mainContent}
            </div>
        </div>
    );
};

export default ProfilePage;
