import React, {useState} from "react";
import axios from "axios";
import AlertError from "../../../components/SignUp/AlertError";
import AlertSuccess from "../../../components/SignUp/AlertSuccess";

const SettingComponent = () => {
    const [emailCurrent, setEmailCurrent] = useState('');
    const [emailNew, setEmailNew] = useState('');
    const [passCurrent, setPassCurrent] = useState('');
    const [passNew, setPassNew] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    // Error and success messages
    const [changeEmailError, setChangeEmailError] = useState('');
    const [changeEmailSuccess, setChangeEmailSuccess] = useState('');
    const [changePasswordError, setChangePasswordError] = useState('');
    const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
    const [deleteAccountError, setDeleteAccountError] = useState('');
    const [deleteAccountSuccess, setDeleteAccountSuccess] = useState('');

    const handleUpdateEmail = async () => {
        try {
            if(emailCurrent && emailNew) {
            console.log(emailCurrent, emailNew);
            const res = await axios.post(`http://localhost:5000/api/accounts/change-email`, {oldEmail: emailCurrent, newEmail: emailNew },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if(res.data?.status){
                    setChangeEmailSuccess("Đã gửi mã xác thực tới email cũ và link kích hoạt tới email mới");
                    setChangeEmailError("");
                }
                else{
                    setChangeEmailError("thao tác không thành công");
                    setChangeEmailSuccess("");
                }
            }
        } catch (error) {
            setChangeEmailError("thao tác không thành công: " + error.message);
            setChangeEmailSuccess("");
        }
    };

    const handleUpdatePassword = async () => {
        try {
             console.log(passCurrent, passNew, passConfirm);
            if(passCurrent && passNew && passConfirm) {
                if((passCurrent !== passConfirm) && (passConfirm == passNew)) {
                    console.log("run to here");
                    const res = await axios.post('http://localhost:5000/api/accounts/change-password', { oldPassword: passCurrent, newPassword: passNew },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });
                    if(res.data?.status){
                        setChangePasswordSuccess("Đã thay đổi mật khẩu thành công");
                        setChangePasswordError("");
                    }
                    else{
                        setChangePasswordError("thao tác không thành công");
                        setChangePasswordSuccess("");
                    }
                }
            }
        } catch (error) {
            setChangePasswordError("thao tác không thành công: " + error.message);
            setChangePasswordSuccess("");
        }
    };

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
                {changeEmailError && <AlertError content={changeEmailError} />}
                {changeEmailSuccess && <AlertSuccess content={changeEmailSuccess} />}
                <button className="setting-btn black" onClick={handleUpdateEmail}>Send verification link</button>
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
                {changePasswordError && <AlertError content={changePasswordError} />}
                {changePasswordSuccess && <AlertSuccess content={changePasswordSuccess} />}
                <button className="setting-btn black" onClick={handleUpdatePassword}>Change password</button>
            </section>

            <section className="setting-section">
                <h2>Delete Account</h2>
                <p className="setting-desc">
                Permanently remove your account from the roadmap.sh. This cannot be undone and all your progress and data will be lost.
                </p>
                {deleteAccountError && <AlertError content={deleteAccountError} />}
                {deleteAccountSuccess && <AlertSuccess content={deleteAccountSuccess} />}
                <button className="setting-btn red">Send verification link</button>
            </section>
        </div>
    );
};

export default SettingComponent;
