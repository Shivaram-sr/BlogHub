const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateProfile,
  followUser
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/:id', getUserProfile);

router.put('/profile', protect, updateProfile);
router.put('/:id/follow', protect, followUser);

module.exports = router;