const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const router = express.Router();

// User Login ('/api/user/login')
router.post('/login', async (req, res) => {
  try {
      console.log('Login request body:', req.body);
      const user = await User.findOne({
          where: {
              email: req.body.email,
          },
      });

      if (!user) {
          res.status(400).json({ message: 'Incorrect username or password, please try again' });
          return;
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
          res.status(400).json({ message: 'Incorrect username or password, please try again' });
          return;
      }

      req.session.save(() => {
          req.session.userId = user.id;
          req.session.username = user.username;
          req.session.loggedIn = true;

          console.log('User logged in successfully');
          console.log('Session:', req.session);
          res.redirect('/dashboard');
      });
  } catch (err) {
      console.log('Login error:', err);
      res.status(500).json({ error: 'An error occurred while logging in' });
  }
});

// router.post('/login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       // Find the user by email
//       const user = await User.findOne({ where: { email } });
//       // Check if the user exists and the password is correct
//       if (!user || !bcrypt.compareSync(password, user.password)) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }
//       // Set the user session
//       req.session.user = user;
//       res.status(200).json({ message: 'Logged in successfully' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

  module.exports = router;