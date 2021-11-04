const express = require('express');

const router = express.Router();
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(validate(userValidation.createUser), userController.createUser);

router
  .route('/:userId')
  .get(validate(userValidation.getUser), userController.getUser)
  .delete(validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router;
