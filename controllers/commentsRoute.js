const express = require('express');
const router = express.Router();
const { UserComment, User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Route for creating a comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Extracting data from the request body
    const { postId, content } = req.body;
    
    // Find the logged-in user
    const loggedInUserId = req.session.userId;

    // Check if the post exists
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Create the comment
    const newComment = await UserComment.create({
      content,
      userId: loggedInUserId,
      postId,
    });

    // Respond with the newly created comment
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;