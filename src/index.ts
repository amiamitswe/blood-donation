import express, { Request, Response, Application, NextFunction } from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { IError } from './types/commonType';

import donarRouter from './router/donarRouter';

const app: Application = express();
app.use(express.json());
dotenv.config();

// app handler
app.use('/donar', donarRouter);

// // // mongodb connection with database
mongoose.connect('mongodb://localhost/bloodDonar')
  .then(() => console.log("Database connection successful !!!"))
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