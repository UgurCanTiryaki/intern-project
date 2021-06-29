const bcryptjs = require('bcryptjs');

const { User } = require('../../models');
const { hashPassword } = require('../../utils/others');

module.exports = async (req, res, next) => {
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const user = req.user;

  const compareResult = await bcryptjs.compare(oldPassword, user.password);
  console.log('-----------------------------------------------')

  if (!compareResult) {
    return res.sendStatus(403);
  }

  await User.update(
    {
      email: user.email,
      password: await hashPassword(newPassword)
    }, { where: { id: user.id } }
  );

  res.sendStatus(204);
};
