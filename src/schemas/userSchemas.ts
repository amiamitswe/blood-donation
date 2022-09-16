import mongoose, { Schema } from 'mongoose';
import { IFotGotPassToken, ILogOutToken, ISIgnUp } from '../types/commonType';

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
    enum: ['admin', 'user'],
    default: 'user',
  },
  password: {
    type: String,
    required: true,
  },
  donarId: Schema.Types.ObjectId,
  favoriteDonar: [Schema.Types.ObjectId],
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

// black list token schema
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

// forgot password token schema
export const forgotPassTokenSchema = new mongoose.Schema<IFotGotPassToken>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600,
  },
});
