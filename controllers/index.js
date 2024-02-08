const router = require('express').Router();

const commentsRoutes = require('./commentsRoute');
const dashboardRoutes = require('./dashboardRoute');
const homeRoutes = require('./homeRoute');
const postsRoutes = require('./postsRoute');

router.use('/comments', commentsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);
router.use('/posts', postsRoutes);

module.exports = router;