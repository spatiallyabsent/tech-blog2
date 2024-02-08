const express = require('express');
const router = express.Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// Route for creating a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Extracting data from the request body
    const { title, content } = req.body;

    // Find the logged-in user
    const loggedInUserId = req.session.userId;

    // Create the post
    const newPost = await Post.create({
      title,
      content,
      userId: loggedInUserId,
    });

    // Respond with the newly created post
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for editing an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Extracting data from the request body
    const { title, content } = req.body;
    const postId = req.params.id;

    // Find the post to be edited
    const post = await Post.findByPk(postId);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Ensure that the logged-in user is the owner of the post
    if (post.userId !== req.session.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update the post
    await post.update({
      title,
      content,
    });

    // Respond with the updated post
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;