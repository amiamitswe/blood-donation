import e, { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { compare, hash } from 'bcrypt';
import { userSchemas } from '../schemas/userSchemas';
import { ISIgnUp } from '../types/commonType';
import jwt from 'jsonwebtoken';

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
  } catch (err) {
    res.status(500).json({
      error: 'There was a server side error !!!',
      err,
    });
  }
};

export const loginHandler: RequestHandler = async (req, res, next) => {
  try {
    const loginUserInfo = await UserModel.find({
      $or: [
        { username: req.body.username.toLowerCase() },
        { email: req.body.username.toLowerCase() },
      ],
    });

    if (loginUserInfo && loginUserInfo.length === 1) {
      const loginUserData = loginUserInfo[0];
      const isValidPassword = await compare(req.body.password, loginUserData.password);

      if (isValidPassword) {
        // generate token for jwt
        const token = jwt.sign(
          { username: loginUserData.username, userId: loginUserData._id },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login Success!!!', token });
      } else {
        res.status(401).json({ error: 'Authentication Failed' });
      }
    } else {
      res.status(401).json({ error: 'Authentication Failed' });
    }
  } catch {
    res.status(401).json({ error: 'Authentication Failed' });
  }
};
