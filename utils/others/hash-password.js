const bcrypt = require('bcryptjs');

module.exports = async str => {
  return bcrypt.hash(str, 12);
};
