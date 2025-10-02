import { useState } from 'react';
import './ItemComment.css'
import ReactQuill from "react-quill-new";   
import "react-quill-new/dist/quill.snow.css";
import DeleteComment from '../DeleteComment/DeleteComment';
import { useEffect } from 'react';
export default function ItemComment(props) {
        const {user,post,comment,handleEditComment, handleDeleteComment} = props;
        const [contentComment,setContentComment] = useState(comment.content);
        const [openEditComment,setOpenEditComment] = useState(false);
        const [openDeleteComment,setOpenDeleteComment] = useState(false);
        // const handleDelete = (e) => {
        // }
        const [teacherEdit,setTeacherEdit] = useState(false);
        const [userEdit,setUserEdit] = useState(false);
        useEffect(()=>{
                        if(user.accountId === comment.accountId){
                            setUserEdit(true);
                        }
                        if(user.accountId === post.accountId){
                                setTeacherEdit(true);
                        }
                        if(user.accountId==post.accountId && post.accountId === comment.accountId){
                                setUserEdit(true);
                                setTeacherEdit(false);
                        }
               
        },[])
        const handleEdit=(e)=>{
        e.preventDefault();
        if (contentComment.trim()) {
                handleEditComment(contentComment,comment.id);
                setOpenEditComment(false);
        }
        }
        return (<>
        <form onSubmit={handleEdit}>
                <div>
                        <div className="item-comment">

                                <div className='d-flex'>
                                        <img src={comment.avatar} className="rounded-circle me-4" width="40" height="40" alt="avatar" />
                                        <div className="d-flex flex-column">
                                                <div className="d-flex">
                                                        <span className="me-2"><strong>{comment.name}</strong></span>
                                                        <span>{comment.createDate}</span>
                                                </div>
                                                {openEditComment?<div className="postcomment p-2">
                                                            <ReactQuill
                                                                value={contentComment}
                                                                onChange={(value)=>setContentComment(value)}
                                                                placeholder="Thông báo nội dung nào đó cho lớp học của bạn"
                                                                modules={{
                                                                    toolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
                                                                }}
                                                            />
                                                
                                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                                <div className="d-flex gap-2">
                                                                    <button type="button" className="btn btn-light" onClick={()=>setOpenEditComment(false)} >
                                                                        Cancel
                                                                    </button>
                                                
                                                                    <button
                                                                        type="submit"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Save
                                                                    </button>
                                                
                                                                </div>
                                                            </div>
                                                        </div>:<div className='comment-body'><div dangerouslySetInnerHTML={{ __html: comment.content }} /></div>}
                                                
                                        </div>
                                </div>
                               {userEdit &&(
                                <div className='dropdown'>
                                        <button className='btn' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li><button type='button' className="dropdown-item" onClick={()=>setOpenEditComment(true)}>Edit</button></li>
                                                <li ><button type='button'className="dropdown-item" onClick={()=>setOpenDeleteComment(true)}>Delete</button></li>
                                        </ul>
                                </div>)}
                                {teacherEdit &&(
                                        <div className='dropdown'>
                                        <button className='btn' id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li ><button type='button'className="dropdown-item" onClick={()=>setOpenDeleteComment(true)}>Delete</button></li>
                                        </ul>
                                </div>
                                )}

                        </div>
                </div>
        </form>
        {openDeleteComment&&<DeleteComment comment={comment} onClose={()=>setOpenDeleteComment(true)} handleDeleteComment={handleDeleteComment}/>}
        </>)
}