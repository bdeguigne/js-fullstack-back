const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validations');
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(userController.getUser)
  .post(validate(userValidation.createUser), userController.createUser);

module.exports = router;
