import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useState } from "react";
import './Comment.css'
export default function Comment(props) {
  const [content, setContent] = useState("");
  const { avatar,handleComment,post } = props

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      handleComment(post.postId,content);
      setContent("");
    }
  };
  return (<>
    <form onSubmit={handleSubmit}>
    <div className="d-flex align-items-center handle-comment">
      {/* Avatar */}
      <div className="me-3" >
        {avatar && (
          <img
            src={avatar}
            className="rounded-circle"
            width="40"
            height="40"
            alt="avatar"
          />
        )}
      </div>

      {/* Input */}
      <div className="handle-comment-input">
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Thêm nhận xét trong lớp học"
          modules={{
            toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
          }}
          className="comment-editor"
        />
      </div>

      {/* Button */}
      <div className="col-auto">
        <button className="btn btn-send">
          <i className="bi bi-play"></i>
        </button>
      </div>
    </div>
    </form>
   

  </>)
}