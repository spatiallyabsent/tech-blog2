const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
 }

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Ensure the value is a valid email address
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, Infinity], // Minimum length of 8 characters
            containsSymbol(value) {
                if (!/[\W_]/.test(value)) {
                    throw new Error('Password must contain at least one symbol');
                }
            }
        }
    },
},
    {
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10); //for naming convention perhaps use newUserData instead of user
                return user;
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10); //may want to change user to updatedUserData for naming convention
                }
                return user;
            },
        },
        sequelize,
        modelName: 'user',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });

module.exports = User;