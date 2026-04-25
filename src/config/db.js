const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydatabase', 'postgres', '1q2w3e,.zxc', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;