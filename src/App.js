import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Posts from "./components/posts-component";
import Pagination from "./components/pagination-component";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My App</h1>
      <Posts posts={currentPost} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
