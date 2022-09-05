import { RequestHandler } from 'express';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

// signup from validation middleware
export const signupMiddleware: RequestHandler = (req, res, next) => {
  const reqData = req.body;
  const email =
    typeof reqData.email === 'string' && reqData.email.trim().length > 6 ? reqData.email : false;
  const username =
    typeof reqData.username === 'string' && reqData.username.trim().length > 4
      ? reqData.username
      : false;
  const password =
    typeof reqData.password === 'string' && reqData.password.trim().length > 4
      ? reqData.password
      : false;

  if (email && username && password) next();
  else {
    const errorMessage: any = {};
    if (!username) errorMessage.username = 'Username is required and more then 4 character';
    if (!email) errorMessage.email = 'Email is required and more then 46character';
    if (!password) errorMessage.password = 'Password is required and more then 4 character';

    res.status(400).json({ error: errorMessage });
  }
};

// login from validation middleware
export const loginMiddleware: RequestHandler = (req, res, next) => {
  const username =
    typeof req.body.username === 'string' && req.body.username.trim().length > 4
      ? req.body.username
      : false;
  const password =
    typeof req.body.password === 'string' && req.body.password.trim().length > 4
      ? req.body.password
      : false;

  if (username && password) next();
  else res.status(400).json({ message: 'All fields are required !' });
};

// logout middleware
export const logOutMiddleware: RequestHandler = (req, res, next) => {
  const userId =
    typeof req.body.userId === 'string' &&
    req.body.userId.length === 24 &&
    ObjectId.isValid(req.body.userId)
      ? req.body.userId
      : false;

  if (userId) next();
  else next('User id is not valid');
};
