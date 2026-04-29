import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const CreatePost = () => {
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const createPost = async (e) => {
    e.preventDefault();
    const { error } = await supabase
        .from('posts')
        .insert({ title: post.title, content: post.content, image_url: post.image_url });
        
    if (!error) navigate("/"); // Use navigate instead of window.location
  };

  const navigate = useNavigate();


  return (
    <div className="form-container">
      <h2>Create a New Post</h2>
      <form onSubmit={createPost}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Content (Optional)" onChange={handleChange} />
        <input name="image_url" placeholder="Image URL (Optional)" onChange={handleChange} />
        <button type="submit" className="submit-btn">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;