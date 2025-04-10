import React, { useState, useEffect } from "react";
import axios from "axios";
const EditPost = ({ selectedPost, onUpdate }) => {
  const [title, setTitle] = useState(selectedPost?.title || "");
  const [body, setBody] = useState(selectedPost?.body || "");
  useEffect(() => {
    setTitle(selectedPost?.title || "");
    setBody(selectedPost?.body || "");
  }, [selectedPost]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://my-backend-coral-eight.vercel.app/posts/${selectedPost.id}`, {
        title,
        body,
        userId: 1,
      })
      .then((response) => {
        onUpdate(response.data);
      })
      .catch((error) => console.error("Error updating post:", error));
  };
  return selectedPost ? (
    <form onSubmit={handleSubmit}>
      <h2>Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Update Post</button>
    </form>
  ) : null;
};
export default EditPost;
