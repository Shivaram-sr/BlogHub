import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ blog }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const getAvatarUrl = (author) => {
    if (author?.avatar) {
      return author.avatar;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(author?.name || 'User')}&background=667eea&color=fff&size=40`;
  };

  return (
    <div className="blog-card">
      {blog.coverImage && (
        <div className="blog-card-image">
          <img src={blog.coverImage} alt={blog.title} />
        </div>
      )}
      
      <div className="blog-card-body">
        <h2 className="blog-card-title">{blog.title}</h2>
        
        <div className="blog-card-meta">
          <div className="blog-author-info">
            <img 
              src={getAvatarUrl(blog.author)} 
              alt={blog.author?.name}
              className="author-avatar-small"
            />
            <span className="blog-author">{blog.author?.name}</span>
          </div>
          <span className="blog-date">{formatDate(blog.createdAt)}</span>
        </div>
        
        <p className="blog-card-content">{truncateContent(blog.content)}</p>
        
        <div className="blog-card-stats">
          <span className="stat-item">
            <span className="stat-icon">❤️</span>
            {blog.likes?.length || 0}
          </span>
          <span className="stat-item">
            <span className="stat-icon">👁️</span>
            {blog.views || 0}
          </span>
        </div>
        
        <Link to={`/blog/${blog._id}`} className="read-more-btn">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;