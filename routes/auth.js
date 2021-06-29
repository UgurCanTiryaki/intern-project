const express = require('express');
const expressValidator = require('express-validator');

const { postLogin, postRegister } = require('../controllers/auth');
const { checkValidationResult } = require('../middlewares');

const router = express.Router();

router.post('/register',
  express.json(),
  [
    expressValidator.body('email')
      .exists().withMessage('email is required.')
      .isString().withMessage('email must be a string.')
      .isEmail().withMessage('email is not valid.'),
    expressValidator.body('password')
      .exists().withMessage('password is required.')
      .isString().withMessage('password must be a string.')
      .isLength({ min: 8 }).withMessage('password must be minimum 8 characters long.')
      .isLength({ max: 20 }).withMessage('password must be maximum 20 characters long.')
      .not().matches(RegExp(/\s/)).withMessage('password must not contain any space character.'),
    checkValidationResult
  ],
  postRegister
);

router.post('/login',
  express.json(),
  [
    expressValidator.body('email')
      .exists().withMessage('email is required.')
      .isString().withMessage('email must be a string.')
      .isEmail().withMessage('email is not valid.'),
    expressValidator.body('password')
      .exists().withMessage('password is required.')
      .isString().withMessage('password must be a string.')
      .isLength({ min: 8 }).withMessage('password must be minimum 8 characters long.')
      .isLength({ max: 20 }).withMessage('password must be maximum 20 characters long.')
      .not().matches(RegExp(/\s/)).withMessage('password must not contain any space character.'),
    checkValidationResult
  ],
  postLogin
);

module.exports = router;
