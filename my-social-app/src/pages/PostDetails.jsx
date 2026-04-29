import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { supabase } from '../client';

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // FIX: Only fetch if id is not undefined
    if (!id) return;

    const fetchData = async () => {
      const { data: postData, error } = await supabase.from('posts').select().eq('id', id).single();
      
      if (error) {
        console.error("Error fetching post:", error);
        return;
      }
      setPost(postData);

      const { data: commentData } = await supabase
        .from('comments')
        .select()
        .eq('post_id', id)
        .order('created_at', { ascending: false });
      setComments(commentData || []);
    };
    fetchData();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "" || !id) return;

    const { data, error } = await supabase
      .from('comments')
      .insert({ content: newComment, post_id: id })
      .select();

    if (!error && data) {
      setComments([data[0], ...comments]);
      setNewComment("");
    }
  };

  const upvote = async () => {
    const { data } = await supabase
      .from('posts')
      .update({ upvotes: post.upvotes + 1 })
      .eq('id', id)
      .select();
    if (data) setPost(data[0]);
  };

  if (!post) return <div className="loading">Loading Post...</div>;

  return (
    <div className="post-detail">
      <div className="post-header">
        <p className="time">Created on: {new Date(post.created_at).toLocaleString()}</p>
        <h1>{post.title}</h1>
        {post.image_url && <img src={post.image_url} alt="Post" className="detail-img" />}
        <p className="content">{post.content}</p>
        <div className="actions">
          <button onClick={upvote}>👍 Upvote: {post.upvotes}</button>
          <Link to={`/edit/${post.id}`}><button className="edit-btn">Edit/Delete Post</button></Link>
        </div>
      </div>

      <hr />

      <div className="comments-section">
        <h3>Comments</h3>
        
        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <input 
            type="text" 
            placeholder="Leave a comment..." 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>

        {/* Comment List */}
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div key={c.id} className="comment-item">
                <p>- {c.content}</p>
                <span className="comment-time">{new Date(c.created_at).toLocaleTimeString()}</span>
              </div>
            ))
          ) : (
            <p className="no-comments">No comments yet. Be the first!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;