import React,{ useState, useEffect } from "react";
import axios from "axios";

const ProfileComponent = ({ changeIntoSetting }) => {
    const [email, setEmail] = useState("");
    const [fullname, setFullname] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const getUserData = async () => {
        const userData = await axios.get('http://localhost:5000/api/profiles/get-profile',{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        setEmail(userData.data.email);
        setFullname(userData.data.profile.fullname);
        setGithub(userData.data.profile.github);
        setLinkedin(userData.data.profile.linkedin);
        return (userData.data.profile);
    };
    useEffect(() => {
        getUserData();
    }, []);
    //     };
    //     fetchData();
    // }, []);
    // console.log("Email:", email);
    // console.log("Form data state:", formData);
    //Hàm thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        switch (name) {
            case "fullname":
                setFullname(value);
                break;
            case "github":
                setGithub(value);
                break;
            case "linkedin":
                setLinkedin(value);
                break;
            default:
                break;
        }
    };

    const handleSaveProfile = async () => {
        await axios.post('http://localhost:5000/api/profiles/update-profile',{
            fullname,
            github,
            linkedin
        },{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
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
                name="fullname"
                value={fullname||""}
                onChange={handleInputChange}
                required
            />
            </div>

            <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
                type="email"
                id="email"
                value={email||""}
                disabled
                className="disabled-input"
            />
            <a className="email-change-link" onClick={changeIntoSetting}>
                Visit settings page to change email
            </a>
            </div>

            <div className="form-group">
            <label htmlFor="github">GitHub</label>
            <input
                type="url"
                id="github"
                name="github"
                value={github||""}
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
                value={linkedin||""}
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