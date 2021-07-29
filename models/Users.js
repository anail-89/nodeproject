const Sequelize = require('sequelize');
const db = require('../config/db');
const { DataTypes } = require('sequelize');

const Users = db.define('users', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    path: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequelize.STRING,
        default: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }


});
associate: (models) => {
    Users.hasMany(models.posts, {
        foreignKey: 'author'
    });
}
module.exports = Users;