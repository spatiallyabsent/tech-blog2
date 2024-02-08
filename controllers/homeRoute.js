const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
    } else {
        res.render('home', { loggedIn: req.session.loggedIn });
    }
});

module.exports = router;
