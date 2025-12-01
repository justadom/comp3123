const { body, param, query } = require('express-validator');
const mongoose = require('mongoose');

const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

module.exports = {
  signupValidation: [
    body('username').notEmpty().withMessage('username is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 chars'),
  ],

  loginValidation: [
    body('password').notEmpty().withMessage('password is required'),
    body().custom((value) => {
      if (!value.email && !value.username) {
        throw new Error('email or username is required');
      }
      return true;
    }),
  ],

  createEmployeeValidation: [
    body('first_name').notEmpty().withMessage('first_name is required'),
    body('last_name').notEmpty().withMessage('last_name is required'),
    body('email').isEmail().withMessage('valid email is required'),
    body('position').notEmpty().withMessage('position is required'),
    body('salary').isNumeric().withMessage('salary must be a number'),
    body('date_of_joining').isISO8601().toDate().withMessage('valid date_of_joining is required'),
    body('department').notEmpty().withMessage('department is required'),
  ],

  objectIdQueryValidation: [
    query('eid').custom((value) => {
      if (!isValidObjectId(value)) throw new Error('Invalid employee id');
      return true;
    }),
  ],

  objectIdParamValidation: [
    param('eid').custom((value) => {
      if (!isValidObjectId(value)) throw new Error('Invalid id');
      return true;
    }),
  ],
};