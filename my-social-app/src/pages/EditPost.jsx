import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', image_url: '' });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from('posts').select().eq('id', id).single();
      setPost(data);
    };
    fetchPost();
  }, [id]);

  const updatePost = async (e) => {
    e.preventDefault();
    await supabase.from('posts').update(post).eq('id', id);
    window.location = `/post/${id}`;
  };

  const deletePost = async () => {
    await supabase.from('posts').delete().eq('id', id);
    window.location = "/";
  };

  return (
    <div className="form-container">
      <h2>Edit Post</h2>
      <form onSubmit={updatePost}>
        <input value={post.title} onChange={(e) => setPost({...post, title: e.target.value})} />
        <textarea value={post.content} onChange={(e) => setPost({...post, content: e.target.value})} />
        <input value={post.image_url} onChange={(e) => setPost({...post, image_url: e.target.value})} />
        <button type="submit">Update Post</button>
      </form>
      <button onClick={deletePost} className="delete-btn">Delete Post</button>
    </div>
  );
};

export default EditPost;