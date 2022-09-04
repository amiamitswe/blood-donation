import mongoose from 'mongoose';

export const userSchemas = new mongoose.Schema({
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
});
