import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogAPI, userAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await blogAPI.getBlogById(id);
      setBlog(response.data.blog);
      setLikesCount(response.data.blog.likes?.length || 0);
      setFollowersCount(response.data.blog.author?.followers?.length || 0);
      
      if (isAuthenticated && user) {
        setIsLiked(response.data.blog.likes?.includes(user.id));
        setIsFollowing(response.data.blog.author?.followers?.includes(user.id));
      }
      
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch blog');
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await blogAPI.likeBlog(id);
      setIsLiked(response.data.isLiked);
      setLikesCount(response.data.likes);
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleFollow = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (blog.author._id === user.id) {
      return; // Can't follow yourself
    }

    try {
      const response = await userAPI.followUser(blog.author._id);
      setIsFollowing(response.data.isFollowing);
      setFollowersCount(response.data.followersCount);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getAvatarUrl = (author) => {
    if (author?.avatar) {
      return author.avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(author?.name || 'User')}&background=667eea&color=fff&size=80`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <h2>Loading blog...</h2>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="error-container">
        <h2>{error || 'Blog not found'}</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      {blog.coverImage && (
        <div className="blog-cover-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-detail-card">
        <button onClick={() => navigate(-1)} className="back-link">
          ← Back
        </button>

        <h1 className="blog-detail-title">{blog.title}</h1>

        <div className="blog-detail-meta">
          <div className="blog-author-section">
            <img 
              src={getAvatarUrl(blog.author)} 
              alt={blog.author?.name}
              className="author-avatar-large"
            />
            <div className="author-info">
              <p className="author-name">{blog.author?.name}</p>
              <p className="author-email">{blog.author?.email}</p>
              {blog.author?.bio && (
                <p className="author-bio">{blog.author.bio}</p>
              )}
              <p className="author-stats">
                {followersCount} followers
              </p>
            </div>
            {isAuthenticated && user?.id !== blog.author?._id && (
              <button 
                onClick={handleFollow} 
                className={`follow-btn ${isFollowing ? 'following' : ''}`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
          
          <div className="blog-metadata">
            <p>Published: {formatDate(blog.createdAt)}</p>
            {blog.updatedAt !== blog.createdAt && (
              <p>Updated: {formatDate(blog.updatedAt)}</p>
            )}
          </div>
        </div>

        <div className="blog-stats-bar">
          <div className="stat-item">
            <span className="stat-icon">👁️</span>
            <span>{blog.views || 0} views</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❤️</span>
            <span>{likesCount} likes</span>
          </div>
        </div>

        <div className="blog-detail-content">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {isAuthenticated && (
          <div className="blog-actions">
            <button 
              onClick={handleLike} 
              className={`like-btn ${isLiked ? 'liked' : ''}`}
            >
              {isLiked ? '❤️ Liked' : '🤍 Like'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;