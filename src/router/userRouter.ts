import express from 'express';
import { signupHandler, loginHandler } from '../handler/userHandler';
import { signupMiddleware, loginMiddleware } from '../middleware/userMiddleware';

const router = express.Router();

// create user
router.post('/signup', signupMiddleware, signupHandler);

// login user
router.post('/login', loginMiddleware, loginHandler);

export default router;
