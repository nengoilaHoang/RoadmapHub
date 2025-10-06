import ReactQuill from "react-quill-new";   
import "react-quill-new/dist/quill.snow.css";
import { FaExclamationTriangle, FaYoutube, FaUpload, FaLink } from "react-icons/fa";
import { useState } from "react";

export default function EditPost(props){
  const {setCloseEdit,post,handleEditPost} = props;
  const [contentPost,setContentPost] =useState(post.content);
  const handleSubtmit = (e)=>{
    e.preventDefault();
    handleEditPost(contentPost,post.postId)
    setCloseEdit();
  }
    return(<>
    <form onSubmit={handleSubtmit}>
    <div class="modal fade show"  tabIndex="-1" 
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Notification</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={setCloseEdit}></button>
          </div>
          <div class="modal-body">
            <ReactQuill
                            value={contentPost}
                            onChange={(value)=>setContentPost(value)}
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
                            
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={setCloseEdit}>Close</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    </form>
   
    </>)
}