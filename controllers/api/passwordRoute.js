const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.put('/update-password', withAuth, async (req, res) => {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Update the user's password
      user.password = await User.hashPassword(password);
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });