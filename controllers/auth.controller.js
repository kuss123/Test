import User from '../models/user.model.js';
import { validationResult } from 'express-validator';
import { errorHandler } from '../../../GET ODN/server/helpers/dbErrorHandling.js';

export const registerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send(errors);
  }
  try {
    const { name, email, password, address, phone } = req.body;
    User.findOne({
      email: email,
    }).exec(async (err, result) => {
      if (result) {
        return res.status(422).send('Email already exists');
      } else {
        const user = await new User({
          name,
          email,
          password,
          address,
          phone,
        }).save();

        console.log(user);

        return res.status(200).json({ user });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
};
