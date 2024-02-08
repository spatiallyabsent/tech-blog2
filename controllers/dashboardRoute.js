const express = require('express');
const router = express.Router();
const { Post, User, UserComment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch all posts with associated comments and user information
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: UserComment,
                    attributes: ['content', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        // Render the main handlebars template with the dashboard handlebars template as the body
        res.render('main', { body: 'dashboard', loggedIn: req.session.loggedIn, posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;