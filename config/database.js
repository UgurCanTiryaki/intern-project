const Sequelize = require('sequelize');

const sequelize = new Sequelize('SanatTeknoloji', 'postgres', 'sanatteknoloji', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres'
});

module.exports = sequelize;
