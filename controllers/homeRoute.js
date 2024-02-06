const express = require('express');
const router = express.Router();
const { Post, User, UserComment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // attempting to get posts with comments and author info
        const posts = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'] 
                },
                {
                    //trying to get the comments and username of the comments
                    model: UserComment,
                    attributes: ['content', 'createdAt'],
                    include: {
                        model: User,
                        attributes: ['username'] 
                    }
                }
            ]
        });

        // Pass the fetched posts to the home.handlebars template
        res.render('home', { layout: 'main', loggedIn: req.session.loggedIn, posts });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;