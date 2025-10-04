import React, { useState,useEffect } from "react";
import Post from "#components/Classroom/ForumClass/Post/Post.jsx";
import ItemPost from "#components/Classroom/ForumClass/ItemPost/ItemPost";

import api from '#utils/api.js'
export default function ForumStudentClass(props) {
  const {classroomId}=props;
  const [posts,setPost]=useState([]);
  const [user,setUser]=useState({});
  async function getPosts(){
            const response = await api.get('/posts/getPosts',{
                withCredentials: true,
                params:{classroomId:classroomId}
            })
            setPost(response.data);
           
        }
  useEffect(()=>{
         async function getAvatarComment(){
                    const response = await api.get('/profiles/get-profile',{
                    withCredentials: true
                    })
                    setUser(response.data?.profile);
                   }
          
         getAvatarComment();
         getPosts();
     },[])
  const handleComment = async(postId,content)=>{
     const response = await api.post('/comments/create',{
      classroomId:classroomId,
      postId:postId,
      content:content
    },{ withCredentials: true})
    await getPosts();
  }
  const handleEditComment = async(content,id)=>{
        const response = await api.put(`/comments/update/${id}`,{
            content:content
        })
        await getPosts();
    }
  const handleDeleteComment = async(id)=>{
        const response = await api.delete(`/comments/delete/${id}`);
        await getPosts();
  }

  return (
    <div className="container mt-4">
      {posts.map((post) => (
        <ItemPost key={post.postId} 
                  post={post.post} 
                  comments={post.comments} 
                  handleComment = {handleComment}
                  handleEditComment = {handleEditComment}
                  handleDeleteComment = {handleDeleteComment}
                  user={user}
        />
         
    ))}
    </div>
  );
}
