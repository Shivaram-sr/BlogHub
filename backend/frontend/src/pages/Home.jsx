import React, { useState, useEffect } from 'react';
import { blogAPI } from '../services/api';
import BlogCard from '../components/BlogCard';
import '../styles/Home.css';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await blogAPI.getAllBlogs();
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch blogs');
      setLoading(false);
      console.error('Error fetching blogs:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading blogs...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to BlogHub</h1>
        <p>Discover amazing stories, insights, and ideas from our vibrant community of writers and thinkers</p>
      </div>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>No blogs available yet</h2>
          <p>Be the first to share your story with the world!</p>
          <a href="/create" className="create-blog-cta">Create Your First Blog</a>
        </div>
      ) : (
        <div className="blogs-section">
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-subtitle">Explore our newest and most engaging content</p>
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;