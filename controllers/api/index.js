const express = require('express');
const router = express.Router();

const signupRoute = require('./signupRoute');
const loginRoute = require('./loginRoute');
const passwordRoute = require('./passwordRoute');
const logoutRoute = require('./logoutRoute');

router.use('/signup', signupRoute);
router.use('/login', loginRoute);
router.use('/update-password', passwordRoute);
router.use('/logout', logoutRoute);

module.exports = router;