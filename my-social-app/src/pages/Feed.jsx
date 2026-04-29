import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState('created_at');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('posts')
        .select()
        .order(orderBy, { ascending: false })
        .ilike('title', `%${searchInput}%`); // Search requirement
      setPosts(data);
    };
    fetchPosts();
  }, [orderBy, searchInput]);

  return (
    <div className="feed-container">
      <div className="controls">
        <input 
          type="text" 
          placeholder="Search by title..." 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
        <div className="sort-buttons">
          <button onClick={() => setOrderBy('created_at')}>Newest</button>
          <button onClick={() => setOrderBy('upvotes')}>Most Popular</button>
        </div>
      </div>

      <div className="post-grid">
        {posts.map(post => (
          <Link to={`/post/${post.id}`} key={post.id} className="post-card">
            <p className="time-stamp">{new Date(post.created_at).toLocaleString()}</p>
            <h3>{post.title}</h3>
            <p>{post.upvotes} upvotes</p>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default Feed;