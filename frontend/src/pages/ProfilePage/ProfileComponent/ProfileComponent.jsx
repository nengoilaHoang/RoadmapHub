import React,{ useState, useEffect } from "react";
import axios from "axios";

const ProfileComponent = () => {
    const getUserData = async () => {
        const userData = await axios.get('http://localhost:5000/api/profiles/get-profile',{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        return userData.data.profile;
    };
    const [formData, setFormData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getUserData();
            setFormData(data);
        };
        fetchData();
    }, []);
    console.log("Form data state:", formData);
    //Hàm thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSaveProfile = () => {
        console.log('Saving profile');
        // thêm logic lưu profile ở đây nếu cần
    };
    return(
    <div className="content-wrapper">
        <div className="profile-header">
            <div className="avatar-container">
            <div className="avatar">
                <img src="https://i.pravatar.cc/120" alt="Profile Avatar" />
            </div>
            <button className="edit-avatar-btn">Edit</button>
            </div>
        </div>

        <form className="profile-form">
            <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData?.fullname||""}
                onChange={handleInputChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
                type="email"
                id="email"
                value={formData?.email||""}
                disabled
                className="disabled-input"
            />
            <a href="#" className="email-change-link">
                Visit settings page to change email
            </a>
            </div>

            <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
                type="url"
                id="github"
                name="github"
                value={formData?.github||""}
                onChange={handleInputChange}
                placeholder="https://github.com/username"
            />
            </div>

            <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
                type="url"
                id="linkedin"
                name="linkedin"
                value={formData?.linkedin||""}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
            />
            </div>

            <button
            type="button"
            className="save-btn"
            onClick={handleSaveProfile}
            >
            Save Profile
            </button>
        </form>
    </div>
    )
}

export default ProfileComponent;