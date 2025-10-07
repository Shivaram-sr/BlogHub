import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { blogAPI } from '../services/api';
import '../styles/BlogForm.css';

const EditBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      const blog = response.data.blog;
      setFormData({
        title: blog.title,
        content: blog.content,
        coverImage: blog.coverImage || '',
      });
      setFetchLoading(false);
    } catch (error) {
      setError('Failed to fetch blog');
      setFetchLoading(false);
    }
  };

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
      await blogAPI.updateBlog(id, formData);
      navigate('/my-blogs');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update blog');
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="loading-container">
        <h2>Loading blog...</h2>
      </div>
    );
  }

  return (
    <div className="blog-form-container">
      <div className="blog-form-card">
        <h2>Edit Blog Post</h2>
        <p className="blog-form-subtitle">Update your blog content</p>

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
              onClick={() => navigate('/my-blogs')}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;