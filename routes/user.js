const express = require('express');
const expressValidator = require('express-validator');
const passport = require('passport');

const { checkValidationResult } = require('../middlewares');
const { putChangePassword } = require('../controllers/user');

const router = express.Router();

router.put('/change-password',
  passport.authenticate(
    'jwt-auth',
    { session: false }
  ),
  express.json(),
  [
    expressValidator.body('newPassword')
      .exists().withMessage('newPassword is required.')
      .isString().withMessage('newPassword must be a string.')
      .isLength({ min: 8 }).withMessage('newPassword must be minimum 8 characters long.')
      .isLength({ max: 20 }).withMessage('newPassword must be maximum 20 characters long.')
      .not().matches(RegExp(/\s/)).withMessage('newPassword must not contain any space character.'),
    expressValidator.body('oldPassword')
      .exists().withMessage('oldPasswordis required.')
      .isString().withMessage('oldPassword must be a string.')
      .isLength({ min: 8 }).withMessage('oldPassword must be minimum 8 characters long.')
      .isLength({ max: 20 }).withMessage('oldPassword must be maximum 20 characters long.')
      .not().matches(RegExp(/\s/)).withMessage('oldPassword must not contain any space character.'),
    checkValidationResult
  ],
  putChangePassword
);

module.exports = router;
