const express = require('express');
const expressValidator = require('express-validator');
const passport = require('passport');

const { postSendTicket } = require('../controllers/ticket');

const { checkValidationResult } = require('../middlewares');

const router = express.Router();

router.post('/send-ticket',
  passport.authenticate(
    'jwt-auth',
    { session: false }
  ),
  express.json(),
  [
    expressValidator.body('title')
      .exists().withMessage('title is required.')
      .isString().withMessage('title must be a string.')
      .isLength({ min: 5 }).withMessage('title must be minimum 5 characters long.')
      .isLength({ max: 150 }).withMessage('title must be maximum 150 characters long.'),
    expressValidator.body('message')
      .exists().withMessage('message is required.')
      .isString().withMessage('message must be a string.')
      .isLength({ min: 15 }).withMessage('message must be minimum 15 characters long.')
      .isLength({ max: 1000 }).withMessage('message must be maximum 1000 characters long.'),
    checkValidationResult
  ],
  postSendTicket
);

module.exports = router;
