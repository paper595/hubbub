import { Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";
import EditPost from "./pages/EditPost";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <h1>Hubbub</h1>
        <div className="nav-links">
          <Link to="/">Home Feed</Link>
          <Link to="/new">Create New Post</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/new" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </div>
  );
}

export default App;