import React, { useState } from "react";
import axios from "axios";
const AddPost = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://my-backend-coral-eight.vercel.app/posts", {
        title,
        body,
        userId: 1,
      })
      .then((response) => {
        onAdd(response.data);
        setTitle("");
        setBody("");
      })
      .catch((error) => console.error("Error adding post:", error));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Post</h2>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={body}
        placeholder="Body"
        onChange={(e) => setBody(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Post</button>
    </form>
  );
};
export default AddPost;
