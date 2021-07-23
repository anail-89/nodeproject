const Sequalize = require('sequelize');
const db = require('../config/database');

const Users = db.define('users', {
    firstName: {
        type: Sequalize.STRING
    },
    lastName: {
        type: Sequalize.STRING
    },
    age: {
        type: Sequalize.INTEGER
    },
    contactEmail: {
        type: Sequalize.STRING
    },
    phoneNumber: {
        type: STRING
    }
});

module.exports = Users;