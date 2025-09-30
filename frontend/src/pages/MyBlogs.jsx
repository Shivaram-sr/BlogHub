import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/MyBlogs.css';

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      const response = await blogAPI.getMyBlogs();
      setBlogs(response.data.blogs);
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch your blogs');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    setDeleteLoading(id);
    try {
      await blogAPI.deleteBlog(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      setDeleteLoading(null);
    } catch (error) {
      alert('Failed to delete blog');
      setDeleteLoading(null);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading your blogs...</h2>
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
    <div className="my-blogs-container">
      <div className="my-blogs-header">
        <h1>My Blog Posts</h1>
        <Link to="/create" className="create-new-btn">
          + Create New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>You haven't created any blogs yet</h2>
          <p>Start sharing your thoughts with the world!</p>
          <Link to="/create" className="create-first-btn">
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="my-blogs-list">
          {blogs.map((blog) => (
            <div key={blog._id} className="my-blog-card">
              <div className="my-blog-content">
                <h2>{blog.title}</h2>
                <p className="my-blog-excerpt">
                  {blog.content.substring(0, 150)}...
                </p>
                <div className="my-blog-stats">
                  <span className="stat-badge">
                    <span className="stat-icon">❤️</span>
                    {blog.likes?.length || 0} likes
                  </span>
                  <span className="stat-badge">
                    <span className="stat-icon">👁️</span>
                    {blog.views || 0} views
                  </span>
                </div>
                <div className="my-blog-meta">
                  <span>Created: {formatDate(blog.createdAt)}</span>
                  {blog.updatedAt !== blog.createdAt && (
                    <span>Updated: {formatDate(blog.updatedAt)}</span>
                  )}
                </div>
              </div>
              <div className="my-blog-actions">
                <Link to={`/blog/${blog._id}`} className="view-btn">
                  View
                </Link>
                <button
                  onClick={() => navigate(`/edit/${blog._id}`)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="delete-btn"
                  disabled={deleteLoading === blog._id}
                >
                  {deleteLoading === blog._id ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;