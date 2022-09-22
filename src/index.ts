import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import { IError } from './types/commonType';

import donarRouter from './router/donarRouter';
import userRouter from './router/userRouter';

const app: Application = express();
// use json parser
app.use(express.json());

// dotnet config
dotenv.config();

// use cors
app.use(cors());

// app handler
app.use('/donar/', donarRouter);
app.use('/user', userRouter);

// // // mongodb connection with database
mongoose
  .connect('mongodb://localhost/bloodDonar')
  .then(() => console.log('Database connection successful !!!'))
  .catch((err) => console.log(err));

// default error handler
const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction): void => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(process.env.PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${process.env.PORT}`);
});
