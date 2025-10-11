import React, { useState, useEffect } from "react";
import Post from "#components/Classroom/ForumClass/Post/Post.jsx";
import ItemPost from "#components/Classroom/ForumClass/ItemPost/ItemPost";

import api from "#utils/api.js";
export default function ForumClass(props) {
  const { classroomId } = props;
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState({});

  async function getPosts() {
    // Backend tự động lấy user info từ token
    const response = await api.get("/posts/getPosts", {
      params: { classroomId: classroomId },
    });
    setPost(response.data);
  }

  useEffect(() => {
    async function getAvatarComment() {
      // Backend tự động lấy user info từ token
      const response = await api.get("/profiles/get-profile");
      setUser(response.data?.profile);
    }
    getAvatarComment();
    getPosts();
  }, []);
  const handlePost = async (content) => {
    // Backend tự động lấy user info từ token và emit socket notification
    const response = await api.post("/posts/create", {
      classroomId: classroomId,
      content: content,
    });
    // console.log(response);
    await getPosts();
  };
  const handleEditPost = async (content, id) => {
    const response = await api.put(`/posts/update/${id}`, {
      content: content,
    });
    await getPosts();
  };
  const handleDeletePost = async (id) => {
    const response = await api.delete(`/posts/delete/${id}`);
    await getPosts();
  };
  const handleComment = async (postId, content) => {
    // Backend tự động lấy user info từ token
    const response = await api.post("/comments/create", {
      classroomId: classroomId,
      postId: postId,
      content: content,
    });
    // console.log(response);
    await getPosts();
  };
  const handleEditComment = async (content, id) => {
    const response = await api.put(`/comments/update/${id}`, {
      content: content,
    });
    await getPosts();
  };
  const handleDeleteComment = async (id) => {
    const response = await api.delete(`/comments/delete/${id}`);
    await getPosts();
  };

  return (
    <div className="container mt-4">
      <Post onCancel={() => console.log("Cancel")} onPost={handlePost} />
      {posts.map((post) => (
        <ItemPost
          key={post.postId}
          post={post.post}
          comments={post.comments}
          handleEditPost={handleEditPost}
          handleDeletePost={handleDeletePost}
          handleComment={handleComment}
          handleEditComment={handleEditComment}
          handleDeleteComment={handleDeleteComment}
          user={user}
        />
      ))}
    </div>
  );
}
