const Sequelize = require('sequelize');

const sequelizeInstance = require('../config/database');

class User extends Sequelize.Model { }
User.init({
    email: {
        type: Sequelize.DataTypes.STRING(254),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            isLowercase: true,
            notNull: true
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING(60),
        allowNull: false,
        validate: {
            notNull: true,
            not: { args: [RegExp(/\s/)], msg: 'Whitespaces are not allowed' },
            len: [60, 60]
        }
    }
}, { sequelize: sequelizeInstance });

module.exports = User;
