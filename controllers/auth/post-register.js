const { User } = require('../../models');
const { hashPassword } = require('../../utils/others');

module.exports = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let user;

  try {
    user = await User.create(
      {
        email,
        password: await hashPassword(password)
      }
    );
  } catch (error) {
    const isErrorEmailUniqueViolation = error.errors.some((validationErrorItem) => validationErrorItem.message === 'email must be unique');

    if (isErrorEmailUniqueViolation) {
      return res.sendStatus(409);
    }

    return next(error);
  }

  return res.status(201).json(
    {
      id: user.id
    }
  );
};
