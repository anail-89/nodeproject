const Sequalize = require('sequelize');
const db = require('../config/db');

const Users = db.define('users', {
    id: {
        type: Sequalize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false
    },
    image: {
        type: Sequalize.STRING,
        allowNull: true
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false
    },
    isActive: {
        type: Sequalize.STRING,
        default: true
    },
    email: {
        type: Sequalize.STRING,
        allowNull: false
    }

});

module.exports = Users;