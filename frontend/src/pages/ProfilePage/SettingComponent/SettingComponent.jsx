import React, {useState} from "react";

const SettingComponent = () => {
    const [emailCurrent, setEmailCurrent] = useState('');
        const [emailNew, setEmailNew] = useState('');
        const [passCurrent, setPassCurrent] = useState('');
        const [passNew, setPassNew] = useState('');
        const [passConfirm, setPassConfirm] = useState('');
    return (
        <div className="setting-content-wrapper">
            <section className="setting-section">
                <h2>Update Email</h2>
                <p className="setting-desc">Use the form below to update your email.</p>
                <input
                className="setting-input"
                type="email"
                placeholder="Email Address"
                value={emailCurrent}
                onChange={e => setEmailCurrent(e.target.value)}
                />
                <input
                className="setting-input"
                type="email"
                placeholder="Enter new email"
                value={emailNew}
                onChange={e => setEmailNew(e.target.value)}
                />
                <button className="setting-btn black">Send verification link</button>
            </section>

            <section className="setting-section">
                <h2>Password</h2>
                <p className="setting-desc">Use the form below to update your password.</p>
                <input
                className="setting-input"
                type="password"
                placeholder="Current Password"
                value={passCurrent}
                onChange={e => setPassCurrent(e.target.value)}
                />
                <input
                className="setting-input"
                type="password"
                placeholder="New Password"
                value={passNew}
                onChange={e => setPassNew(e.target.value)}
                />
                <input
                className="setting-input"
                type="password"
                placeholder="Confirm New Password"
                value={passConfirm}
                onChange={e => setPassConfirm(e.target.value)}
                />
                <button className="setting-btn black">Send verification link</button>
            </section>

            <section className="setting-section">
                <h2>Delete Account</h2>
                <p className="setting-desc">
                Permanently remove your account from the roadmap.sh. This cannot be undone and all your progress and data will be lost.
                </p>
                <button className="setting-btn red">Send verification link</button>
            </section>
        </div>
    );
};

export default SettingComponent;
