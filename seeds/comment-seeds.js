const { UserComment } = require('../models');

const commentData = [
    {
        content: 'But I need the clean code!',
        userId: 2,
        postId: 1,
    },
    {
        content: 'Someone had a bad day with a new hire I take it',
        userId: 3,
        postId: 2,
    },
    {
        content: 'Wish I could help you with that bud',
        userId: 1,
        postId: 3,
    },
];

const seedComments = () => UserComment.bulkCreate(commentData);

module.exports = seedComments;