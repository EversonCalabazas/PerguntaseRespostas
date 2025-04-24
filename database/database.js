const Sequelize = require('sequelize');

const connection = new Sequelize('guiaperguntas','root', '1234567890', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;


