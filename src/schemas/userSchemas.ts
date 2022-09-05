import mongoose from 'mongoose';
import { ILogOutToken, ISIgnUp } from '../types/commonType';

export const userSchemas = new mongoose.Schema<ISIgnUp>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superAdmin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updateAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

export const expireTokenSchemas = new mongoose.Schema<ILogOutToken>({
  expireToken: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
