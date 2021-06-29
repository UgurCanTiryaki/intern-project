const Sequelize = require('sequelize');

const sequelizeInstance = require('../config/database');

class Ticket extends Sequelize.Model { }
Ticket.init({
  title: {
    type: Sequelize.DataTypes.STRING(150),
    allowNull: false,
    validate: {
      notNull: true,
      len: [5, 150],
    }
  },
  message: {
    type: Sequelize.DataTypes.STRING(1000),
    allowNull: false,
    validate: {
      notNull: true,
      len: [15, 1000],
    }
  }
}, { sequelize: sequelizeInstance });

module.exports = Ticket;
