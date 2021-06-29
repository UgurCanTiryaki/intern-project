const { Ticket } = require('../../models');

module.exports = async (req, res, next) => {
  const title = req.body.title;
  const message = req.body.message;
  const UserId = req.user.id;

  await Ticket.create(
    {
      title,
      message,
      UserId
    }
  );

  res.sendStatus(204);
};
