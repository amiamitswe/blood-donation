// @ts-nocheck

import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const checkLogin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const authToken = authorization?.split(' ')[1];
    const decode: any = jwt.verify(authToken as string, process.env.JWT_SECRET as string);
    req.username = decode.username;
    req.userId = decode.userId;

    next();
  } catch {
    next('Authorization Failed !!!');
  }
};

export default checkLogin;
