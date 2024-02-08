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
                if (user.changed('password')) {
                    user.password = await User.hashPassword(user.password);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await User.hashPassword(user.password);
                }
            },
        },
        sequelize,
        modelName: 'user',
        timestamps: false,
        freezeTableName: true,
        underscored: true,
    });

module.exports = User;