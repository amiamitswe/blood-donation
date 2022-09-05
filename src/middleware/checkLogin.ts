// @ts-nocheck

import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { expireTokenSchemas } from '../schemas/userSchemas';
import { ILogOutToken } from '../types/commonType';

const ExpireTokenModel = mongoose.model<ILogOutToken>('Token', expireTokenSchemas);

const checkLogin: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const authToken = authorization?.split(' ')[1];
    const checkTokenIsBlocked = await ExpireTokenModel.findOne({ expireToken: authToken });

    if (checkTokenIsBlocked) {
      next('Authorization Failed !!! 1');
    } else {
      const decode: any = jwt.verify(authToken as string, process.env.JWT_SECRET as string);
      req.username = decode.username;
      req.userId = decode.userId;

      next();
    }
  } catch {
    next('Authorization Failed !!! 2');
  }
};

export default checkLogin;
