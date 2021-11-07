const express = require('express');

const router = express.Router();
const { validate } = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');

router
  .route('/register')
  .post(validate(authValidation.register), authController.register);

router
  .route('/login')
  .post(validate(authValidation.login), authController.login);

module.exports = router;
