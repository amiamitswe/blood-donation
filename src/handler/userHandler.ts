import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { userSchemas } from '../schemas/userSchemas';

// create user model
const UserModel = mongoose.model('User', userSchemas);
