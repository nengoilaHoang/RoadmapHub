import React, { useState } from "react";
import AlertError from "../../SignUp/AlertError";
import AlertSuccess from "../../SignUp/AlertSuccess";
import api from "../../../utils/api";
const SettingComponent = () => {
  const [emailCurrent, setEmailCurrent] = useState("");
  const [emailNew, setEmailNew] = useState("");
  const [passCurrent, setPassCurrent] = useState("");
  const [passNew, setPassNew] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  // Error and success messages
  const [changeEmailError, setChangeEmailError] = useState("");
  const [changeEmailSuccess, setChangeEmailSuccess] = useState("");
  const [changePasswordError, setChangePasswordError] = useState("");
  const [changePasswordSuccess, setChangePasswordSuccess] = useState("");
  const [deleteAccountError, setDeleteAccountError] = useState("");
  const [deleteAccountSuccess, setDeleteAccountSuccess] = useState("");

  const handleUpdateEmail = async () => {
    try {
      if (emailCurrent && emailNew) {
        // Backend tự động lấy user info từ token và trả về token mới sau verify
        const res = await api.post(`/accounts/change-email`, {
          oldEmail: emailCurrent,
          newEmail: emailNew,
        });
        if (res.data?.status) {
          setChangeEmailSuccess(
            "Đã gửi mã xác thực tới email cũ và link kích hoạt tới email mới"
          );
          setChangeEmailError("");
        } else {
          setChangeEmailError("thao tác không thành công");
          setChangeEmailSuccess("");
        }
      } else {
        setChangeEmailError("hãy nhập đầy đủ thông tin");
        setChangeEmailSuccess("");
      }
    } catch (error) {
      setChangeEmailError("thao tác không thành công: " + error.message);
      setChangeEmailSuccess("");
    }
  };

  const handleUpdatePassword = async () => {
    try {
      //console.log(passCurrent, passNew, passConfirm);
      if (passCurrent && passNew && passConfirm) {
        if (passCurrent !== passConfirm && passConfirm == passNew) {
          //console.log("run to here");
          // Backend tự động lấy user info từ token
          const res = await api.post("/accounts/change-password", {
            oldPassword: passCurrent,
            newPassword: passNew,
          });
          if (res.data?.status) {
            setChangePasswordSuccess("Đã thay đổi mật khẩu thành công");
            setChangePasswordError("");
          } else {
            setChangePasswordError("thao tác không thành công");
            setChangePasswordSuccess("");
          }
        } else {
          setChangePasswordError(
            "mật khẩu cũ không đúng hoặc mật khẩu mới không khớp"
          );
          setChangePasswordSuccess("");
        }
      } else {
        setChangePasswordError("hãy nhập đầy đủ thông tin");
        setChangePasswordSuccess("");
      }
    } catch (error) {
      setChangePasswordError("thao tác không thành công: " + error.message);
      setChangePasswordSuccess("");
    }
  };
  const handleDeleteAccount = async () => {
    try {
      // Backend tự động lấy user info từ token
      const res = await api.post("/accounts/delete-account");
      if (res.data?.status) {
        setDeleteAccountSuccess("Đã gửi mail xác thực tới email của bạn");
        setDeleteAccountError("");
      } else {
        setDeleteAccountError("thao tác không thành công");
        setDeleteAccountSuccess("");
      }
    } catch (error) {
      setDeleteAccountError("thao tác không thành công: " + error.message);
      setDeleteAccountSuccess("");
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
          onChange={(e) => setEmailCurrent(e.target.value)}
        />
        <input
          className="setting-input"
          type="email"
          placeholder="Enter new email"
          value={emailNew}
          onChange={(e) => setEmailNew(e.target.value)}
        />
        {changeEmailError && <AlertError content={changeEmailError} />}
        {changeEmailSuccess && <AlertSuccess content={changeEmailSuccess} />}
        <button className="setting-btn black" onClick={handleUpdateEmail}>
          Send verification link
        </button>
      </section>

      <section className="setting-section">
        <h2>Password</h2>
        <p className="setting-desc">
          Use the form below to update your password.
        </p>
        <input
          className="setting-input"
          type="password"
          placeholder="Current Password"
          value={passCurrent}
          onChange={(e) => setPassCurrent(e.target.value)}
        />
        <input
          className="setting-input"
          type="password"
          placeholder="New Password"
          value={passNew}
          onChange={(e) => setPassNew(e.target.value)}
        />
        <input
          className="setting-input"
          type="password"
          placeholder="Confirm New Password"
          value={passConfirm}
          onChange={(e) => setPassConfirm(e.target.value)}
        />
        {changePasswordError && <AlertError content={changePasswordError} />}
        {changePasswordSuccess && (
          <AlertSuccess content={changePasswordSuccess} />
        )}
        <button className="setting-btn black" onClick={handleUpdatePassword}>
          Change password
        </button>
      </section>

      <section className="setting-section">
        <h2>Delete Account</h2>
        <p className="setting-desc">
          Permanently remove your account from the roadmap.sh. This cannot be
          undone and all your progress and data will be lost.
        </p>
        {deleteAccountError && <AlertError content={deleteAccountError} />}
        {deleteAccountSuccess && (
          <AlertSuccess content={deleteAccountSuccess} />
        )}
        <button className="setting-btn red" onClick={handleDeleteAccount}>
          Send verification link
        </button>
      </section>
    </div>
  );
};

export default SettingComponent;
