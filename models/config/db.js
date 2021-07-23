const { Sequelize } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('codegig', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});