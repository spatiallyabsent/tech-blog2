const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserComment extends Model { }

UserComment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id'
        }
    },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id',
            },
        },

    },
 {
    sequelize,
    modelName: 'user_comment',
    timestamps: false,
    freezeTableName: true,
    underscored: true,
});

module.exports = UserComment;