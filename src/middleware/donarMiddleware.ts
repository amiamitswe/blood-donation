import { Request, Response } from 'express';

export const addDonarMiddleware = (req: Request, res: Response, next: any) => {
  next();
};