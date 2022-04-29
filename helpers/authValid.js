import { check, body } from 'express-validator';

export const validRegister = [
  body('password').default(undefined),
  body('name').default(undefined),
  body('phone').default(undefined),
  body('email').default(undefined),

  body('role').default(undefined),

  check('name', 'Name is required')
    .notEmpty()
    .isLength({
      min: 3,
      max: 32,
    })
    .withMessage('name must be between 3 to 32 characters'),
  check('email', 'Enter valid Email')
    .notEmpty()
    .isEmail()
    .withMessage('Must be a valid email address'),
  check('password', 'Enter valid password')
    .isLength({ min: 6 })
    .matches(/(?=.*?[0-9])/)
    .withMessage(
      'Password must contain 6 letter with a character and a number'
    ),
  check('phone', 'Enter a valid phone number')
    .notEmpty()
    .withMessage('Phone number is required'),
  check('phone', 'Enter valid phone number')
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .withMessage('Please enter a valid phone number'),
  check('role')
    .notEmpty()
    .withMessage('Must Enter the role')
    .isIn(['Admin', 'Staff', 'Team', 'Vendor'])
    .withMessage('Invalid Role'),
];
