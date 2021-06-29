const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

module.exports = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ where: { email: email } });

  if (!user) {
    return res.sendStatus(401);
  }

  const compareResult = await bcryptjs.compare(password, user.password);

  if (!compareResult) {
    return res.sendStatus(401);
  }

  const tokens = {};

  tokens.accessToken = jwt.sign(
    {
      sub: user.id,
    },
    'secret',
    {
      expiresIn: '15m', // 15 min
    }
  );

  tokens.refreshToken = jwt.sign(
    {
      sub: user.id,
    },
    'refreshsecret',
    {
      expiresIn: '7d', // 7 days
    }
  );

  console.log(tokens);

  if (!tokens) {
    return res.sendStatus(401);
  }

  res.status(200).json(tokens);
};
