const Sequelize = require('sequelize');
const db = require('../config/db');

const Posts = db.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    author: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        }
    }

}, { timestamps: true, versionKey: false });
Posts.belongsTo(models.Users, {
    foreignKey: 'id'
});
module.exports = Posts;