import e, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { hash } from 'bcrypt';
import { userSchemas } from '../schemas/userSchemas';
import { ISIgnUp } from '../types/commonType';

// create user model
const UserModel = mongoose.model<ISIgnUp>('User', userSchemas);

// signup functionality
export const signupHandler: RequestHandler = async (req, res, next) => {
  try {
    const checkIsUserExist = await UserModel.find({
      $or: [{ email: req.body.email.toLowerCase() }, { username: req.body.username.toLowerCase() }],
    });
    if (checkIsUserExist && checkIsUserExist.length > 0) {
      res.status(400).json({
        error: 'User Already exist',
      });
    } else {
      const hashedPassword = await hash(req.body.password, 10);

      const updateSignUpData: ISIgnUp = {
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
      };

      const newUser = new UserModel(updateSignUpData);
      const result = await newUser.save();

      res.status(200).json({
        message: 'User inserted successfully !!!',
        data: {
          username: result.username,
          email: result.email,
          create: result.createAt,
        },
      });
    }
    // if(checkIsUserExist)
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error !!!',
      err,
    });
  }
};
