import './ItemPost.css'
import { useEffect, useState } from "react";
import Comment from "../Comment/Comment.jsx";
import ItemComment from "../ItemComment/ItemComment.jsx";
import EditPost from "../EditPost/EditPost.jsx"

import api from '#utils/api.js'
import DeletePost from '../DeletePost/DeletePost.jsx';
export default function ItemPost(props){
    const {key,user,post,comments,handleEditPost,handleDeletePost,handleComment,handleEditComment,handleDeleteComment} = props;
    const [openComment,setComment] = useState(true);
    const [showAll, setShowAll] = useState(false);
    const [avatar,setAvatar] = useState("");
    const [openEdit,setOpenEdit] = useState(false);
    const [openDelete,setOpenDelete] = useState(false);
    const [teacherEdit,setTeacherEdit] = useState(false);
    useEffect(()=>{
        if(user.accountId === post.accountId){
            setTeacherEdit(true);
        }
        setAvatar(user.avatar)
    },[])
    const visibleComments = showAll 
    ? comments 
    : comments.slice(-3);
    
    return( 
    <>
    
    {/* <form onSubmit={handleDelete}> */}
        <div className="item-post" id={`post-${post.id}`} key={key}>
        <div className="header-post">
                <div className='d-flex'>
                    <img src={post.avatar} className="rounded-circle me-4" width="40" height="40" alt="avatar"/>
                    <div className="d-flex flex-column">
                        <span><strong>{post.name}</strong></span>
                        <span>{post.createDate}</span>
                    </div>
                </div>
                    {teacherEdit &&(<div className='dropdown'>
                        <button className='btn ' id="dropdownMenu2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                            <li><button data-bs-toggle="modal" data-bs-target="#exampleModal" className="dropdown-item" type='button' onClick={() => setOpenEdit(true)}>Edit</button></li>
                            <li><button className="dropdown-item" type='button' onClick={() => setOpenDelete(true)}>Delete</button></li>
                        </ul>
                        
                        
                    </div>
                    )}
               
        </div>
        <div className="body-post">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="comment">
            {visibleComments.map((comment)=>(
                <ItemComment key={comment.id} user={user}post={post}comment={comment} handleEditComment={handleEditComment} handleDeleteComment={handleDeleteComment} />
            ))}
            {comments.length > 3 && (
            <button
              type="button"
              className="btn btn-link p-0 mt-2 ms-4 mb-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Ẩn bớt" : "Xem thêm"}
            </button>
          )}
            {openComment && <Comment post={post} avatar = {avatar} handleComment={handleComment}/>}
        </div>
        </div>
    {/* </form> */}
     {openEdit&&<EditPost post = {post} setCloseEdit={()=>setOpenEdit(false)} handleEditPost={handleEditPost}/>}
     {openDelete&&<DeletePost post = {post} onClose={()=>setOpenDelete(false)} handleDeletePost={handleDeletePost}/>}   
    </>
    )
}