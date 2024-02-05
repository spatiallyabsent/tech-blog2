const sequelize = require('../config/connection');
const { User } = require('../models');
const userSeedData = require('./userData.json');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); //after testing may need to set to false
    await User.bulkCreate(userSeedData);
    await seedPosts();
    await seedComments();

    process.exit(0);
};

seedDatabase();