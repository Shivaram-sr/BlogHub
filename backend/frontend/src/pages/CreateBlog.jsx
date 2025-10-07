import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/BlogForm.css';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.title || !formData.content) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      await blogAPI.createBlog(formData);
      navigate('/my-blogs');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create blog');
      setLoading(false);
    }
  };

  return (
    <div className="blog-form-container">
      <div className="blog-form-card">
        <h2>Create New Blog Post</h2>
        <p className="blog-form-subtitle">Share your thoughts with the world</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label>Cover Image URL (optional)</label>
            <input
              type="url"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
            <small className="form-hint">Add a cover image to make your blog more attractive</small>
          </div>

          {formData.coverImage && (
            <div className="image-preview">
              <img src={formData.coverImage} alt="Cover preview" />
            </div>
          )}

          <div className="form-group">
            <label>Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="12"
              required
            ></textarea>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;