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
        references: {
            model: 'Users', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    }

}, { timestamps: true, versionKey: false });

module.exports = Posts;