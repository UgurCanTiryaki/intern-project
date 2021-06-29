const User = require('./user');
const Ticket = require('./ticket');

User.hasMany(
  Ticket,
  {
    foreignKey: {
      allowNull: false
    }
  }
);
Ticket.belongsTo(User);

module.exports = {
  Ticket,
  User
};
