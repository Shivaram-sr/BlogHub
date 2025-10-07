const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs,
  likeBlog,
  addComment,
  deleteComment
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.get('/user/my-blogs', protect, getMyBlogs);

router.put('/:id/like', protect, likeBlog);
router.post('/:id/comment', protect, addComment);
router.delete('/:id/comment/:commentId', protect, deleteComment);

module.exports = router;