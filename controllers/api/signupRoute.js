const express = require('express');
const { User } = require('../models');
const router = express.Router();

// router.post('/signup', async (req, res) => {
//   try {
//     console.log('Request body:', req.body);

//     const newUser = await User.creat({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });
    
//     console.log('New user:', newUser);

//     req.session.save(() => {
//       req.session.userId = newUser.id;
//       req.session.username = newUser.username;
//       req.session.loggedIn = true;

//       res.redirect('/dashboard');
//     });
//   } catch (err) {
//     console.error('Error creating new user:', err);
//     res.status(500).json(err);
//   }
// });

// Route for creating a new user account
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    // Create a new user
    const newUser = await User.create({ username, email, password });
    console.log('New User', newUser.toJSON());
    // Return the new user data
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;