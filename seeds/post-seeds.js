const { Post } = require('../models');

const postData = [
    {
        title: 'Stop Writing Clean Code',
        content: 'Clean code is not allways necessary. Sometimes it lengthens the time it takes to process your code.',
        userId: 1 //may need to replace
    },
    {
        title: 'Learn your Data Structures',
        content: 'To many coders these days do not know how to work with different types of data structures',
        userId: 2 //may need to replace
    },
    {
        title: 'Learning Augmented Reality',
        content: 'looking to get into writing code for augmented reality, where should I start',
        userId: 3 //may need to replace
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;