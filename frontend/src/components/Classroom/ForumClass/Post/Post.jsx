import React, { useState } from "react";
import ReactQuill from "react-quill-new";   
import "react-quill-new/dist/quill.snow.css";
import { FaExclamationTriangle, FaYoutube, FaUpload, FaLink } from "react-icons/fa";
import "./Post.css";

export default function Post({ onCancel, onPost }) {
    const [content, setContent] = useState("");

    const handlePost = (e) => {
        e.preventDefault();
        if (content.trim()) {
            onPost(content);
            setContent("");
        }
    };

    return (
        <form onSubmit={handlePost}>
        <div className="postbox p-3">
            <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Thông báo nội dung nào đó cho lớp học của bạn"
                modules={{
                    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
                }}
            />

            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex gap-3">
                    <button type="button" className="btn btn-light icon-btn">
                        <FaExclamationTriangle />
                    </button>

                    <button type="button" className="btn btn-light icon-btn">
                        <FaYoutube />
                    </button>

                    <button type="button" className="btn btn-light icon-btn">
                        <FaUpload />
                    </button>

                    <button type="button" className="btn btn-light icon-btn">
                        <FaLink />
                    </button>
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-light" >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        
                    >
                        Post
                    </button>

                </div>
            </div>
        </div>
        </form>
    );
}
