const { Ticket } = require('../../models');

module.exports = async (req, res, next) => {
  const UserId = req.user.id;

  const userTickets = await Ticket.findAll(
    { where: { UserId } }
  );

  res.status(200).json(userTickets);
};
